---
title: "Moving MyCGPA from bare React Native to Expo"
date: "2026-03-10"
excerpt: "MyCGPA started in 2023 as a bare React Native app. In 2025 I moved it to Expo for the tooling and for over-the-air updates. What the move actually involves now, the order I'd do it in, and the edges that cut."
tags: ["React Native", "Expo", "Mobile", "MyCGPA"]
---

[MyCGPA](https://apps.apple.com/us/app/mycgpa/id6450861410) is the app I have maintained the longest. It started in 2023 as a bare React Native app, generated with the CLI, with hand-edited `android/` and `ios/` folders, because at the time a lot of people would tell you that Expo was for prototypes and you would eject eventually. I have shipped it solo since, on both stores.

By 2025 that advice was two years out of date and I was paying for it: every bug fix, even a one-line one, meant a full native build, two store submissions, and a wait on review. For an app one person maintains in the evenings, the release process was the bottleneck, not the code. So I moved it to Expo. This post is what that means today, the order I would do it in, and where it bit.

## What "moving to Expo" means now

It does not mean Expo Go, and it does not mean giving anything up. It is the same app, running the same React Native, with three things changed:

1. **Expo's modules** replace a pile of community packages, and get upgraded together with each SDK instead of one at a time.
2. **The native projects are generated**, not maintained by hand. `app.json` (or `app.config.ts`) is the source of truth, and `npx expo prebuild` turns it into `android/` and `ios/` on demand. Expo calls this Continuous Native Generation. You *can* keep hand-maintained native folders, but the win is deleting them.
3. **`expo-updates`** lets you ship the JavaScript bundle straight to installed apps, without a store release, for anything that does not change native code.

The third one was the reason. The first two are why the third one is reliable.

## The order that works

Do the safe, reversible steps first, and the destructive step last, when everything already works.

### 1. Install Expo into the app you have

```bash
npx install-expo-modules@latest
npx expo run:android
npx expo run:ios
```

The first command adds the `expo` package and wires Expo's module system into your existing native projects. Nothing else changes. If the app builds and runs through `expo run`, you have a bare app with Expo inside it, and every step from here is incremental.

### 2. Swap libraries one at a time

Go through `package.json` and, for every community package that has a maintained Expo equivalent, replace it and test before moving to the next. File system, image picker, secure storage, haptics, notifications, splash screen: the usual suspects. Then:

```bash
npx expo install --fix
npx expo-doctor
```

`install --fix` aligns every Expo package with the version the SDK expects, and `expo-doctor` will tell you which of your remaining dependencies are known to be incompatible before you find out at build time.

Do this *before* you generate native projects, not after. Each swap is testable on its own, and the fewer hand-written native changes you are carrying into the next step, the smaller the diff you have to understand there.

### 3. Move native config into the config file

Everything you ever edited by hand in the native projects has to end up in `app.json`: app name, bundle identifier and package name, version, icons, splash screen, permissions, orientation, deep-link schemes. A lot of it is a top-level key. For the things that are not, there is either a config plugin published by the library, or a small one you write.

```json
{
  "expo": {
    "name": "MyCGPA",
    "slug": "mycgpa",
    "scheme": "mycgpa",
    "ios": { "bundleIdentifier": "com.mycgpa", "supportsTablet": true },
    "android": { "package": "com.mycgpa", "edgeToEdgeEnabled": true },
    "plugins": [
      "expo-secure-store",
      ["./plugins/withMetaData", { "name": "com.example.API_KEY", "value": "..." }]
    ],
    "runtimeVersion": { "policy": "fingerprint" },
    "updates": { "url": "https://u.expo.dev/<your-project-id>" }
  }
}
```

A config plugin is a function that receives the config and returns it, with a hook into whichever native file it needs to modify. Here is the whole of one that adds a `<meta-data>` entry a library wanted in `AndroidManifest.xml`, the kind of edit that used to live only in a file I had to remember not to lose:

```ts
import { AndroidConfig, withAndroidManifest, type ConfigPlugin } from "expo/config-plugins";

const withMetaData: ConfigPlugin<{ name: string; value: string }> = (config, { name, value }) =>
  withAndroidManifest(config, (config) => {
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
    AndroidConfig.Manifest.addMetaDataItemToMainApplication(application, name, value);
    return config;
  });

export default withMetaData;
```

That is the pattern for every one-off native change: it becomes a few lines that are version-controlled, re-applied on every prebuild, and impossible to lose in a merge.

### 4. Generate, then diff

```bash
npx expo prebuild --clean
```

Now compare the generated `android/` and `ios/` against your old ones. This is the step that tells you what you forgot. Every difference is one of three things: config you have not moved yet, a plugin you still need to write, or something you were carrying for no reason and can let go of. The third category is bigger than you expect. Two years of a hand-maintained native project accumulates stuff.

### 5. Delete the native folders

Once the generated projects build and the app behaves, delete `android/` and `ios/`, add them to `.gitignore`, and build from config from then on, with EAS Build or locally through `expo run`. Keep the old folders on a branch for a while if it makes you feel better; you will not look at them again.

### 6. Turn on updates

```bash
npx expo install expo-updates
eas update:configure
eas build --profile production --platform all
```

The first store release after the migration is the one that carries `expo-updates`. After that, a JavaScript-only fix is:

```bash
eas update --channel production --message "Fix rounding on the 5-point scale"
```

and every installed copy on that channel downloads it in the background and runs it on the next cold start. No build, no submission, no review.

## The edges that cut

**Runtime versions are the rule you need to actually understand.** An over-the-air update is only applied to a binary with the *same* runtime version. If they differ, the update is silently ignored, which is the correct behaviour and also a confusing afternoon the first time. The `fingerprint` policy computes the runtime version from a hash of everything native in the project, so any change that would need a store release automatically bumps it and the old binaries stop receiving updates they could not run. Use that policy. Do not hand-maintain a version string you will forget to bump.

**Never ship an update that assumes a native module the binary does not have.** The update mechanism cannot check for you. If you add a library with native code and then `eas update`, the JavaScript will load on old binaries and crash the moment it touches the missing module. New native dependency means new build, new store release, and the fingerprint policy will tell you so by changing the runtime version.

**Channels are your safety.** Point internal builds at a `preview` channel and store builds at `production`, and never publish to `production` without having run the same bundle on `preview`. It is too easy to push a broken bundle to every user with one command.

**The New Architecture is on by default now.** Expo enables it from SDK 53 onwards. Most maintained libraries are fine; a couple of older ones are not, and `"newArchEnabled": false` in `app.json` buys you time to replace them rather than blocking the whole migration on a dependency you did not choose recently.

**Genuinely custom native code needs a home.** A config plugin modifies generated files; it does not let you write Kotlin or Swift. For the actual native code you used to keep in `MainApplication` or `AppDelegate`, the answer is the Expo Modules API, which is a nicer way to write a native module than what came before. But it is work, and it is worth finding out how much of it you have before you start.

## Before and after

| | Bare React Native, 2023 | Expo, 2025 |
| --- | --- | --- |
| Native projects | Hand-edited, in git | Generated from `app.json`, ignored by git |
| Upgrading React Native | A weekend and a diff tool | `npx expo install --fix` plus release notes |
| A one-line JavaScript fix | Build, submit twice, wait for review | `eas update`, live within the hour |
| A native change | Build, submit twice, wait for review | Same, and the fingerprint tells me which changes count |
| Library versions | Chosen individually, drifting | Pinned to the SDK, upgraded together |

## What changed

"Better developer experience and over-the-air updates" is the tidy summary I put on the project card. The real change is smaller and more personal than that: a bug report from a student in the morning can be fixed the same day, and I do not have to decide whether a fix is *worth* a release anymore. Every fix is worth an `eas update`.

If you are maintaining a bare app alone and still telling yourself Expo is for prototypes, that stopped being true a while ago. Install it into the app you have, swap libraries one at a time, move your config, generate, diff, delete. It is a few evenings, and the release you never have to do again pays for all of them.
