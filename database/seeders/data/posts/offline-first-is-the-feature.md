---
title: "Offline-first is the feature"
date: "2026-07-14"
excerpt: "MySales has no accounts, no cloud and nothing to sync. That was the point. What building a profit tracker for market traders taught me about designing for a network you can't count on."
tags: ["React Native", "Expo", "Offline-first", "Product"]
---

MySales exists because Grace needed to know one thing at the end of each day: did I win or did I lose? She had a shop, a notebook, and a phone. What she did not have was a reliable internet connection or any patience for an app that wanted an email address before it would let her type in a sale.

Every app she had tried treated the network as a given. Sign up, verify, sync, then wait for a spinner to decide whether the number on the screen was real. That is a fine model for a bank. It is a terrible model for someone recording a ₦1,500 sale between customers, on a mid-range Android, on a data plan she pays for by the megabyte.

So the first product decision was the one that shaped everything else: **no accounts, no cloud, no sync**. Your data lives on your device and nowhere else. This post is about what that decision buys you, what it costs, and how the app is built underneath it.

## "Offline-first" usually means "sync"

When engineers say offline-first they usually mean a local cache in front of a server, plus a queue of pending writes, plus some story about what happens when two devices disagree. Every part of that is hard, and the last part is where the real bugs live. Conflict resolution is the kind of feature that looks finished for months and then eats someone's data.

MySales skips the entire problem. The device is not a cache of the truth; the device *is* the truth. There is no server to disagree with, so there is nothing to reconcile, no pending state to show, and no moment where the app has to tell Grace that the sale she recorded at 2pm did not "go through".

That is the version of offline-first I would recommend to anyone building for users like her. Sync is a feature you add when you have a reason, not a foundation you start from. The cheapest sync strategy is not needing one.

## What it buys you

- **No loading states.** Nothing waits on a network, so nothing spins. Tap, and the number changes. On a phone that struggles with heavier apps, that alone makes MySales feel faster than it has any right to.
- **No backend to run.** No servers, no database to back up at 3am, no monthly bill that scales with people who have never paid me. For a free app built for a market trader, that is the difference between existing and not.
- **Privacy by construction.** I cannot leak what I do not have. There is no account to breach, no analytics table full of how much a stranger made last Tuesday.
- **No signup wall.** The first screen is the app, and the first thing you can do is record a sale.

## What it costs

- **No multi-device.** Your phone is the only copy. That is fine until it is not.
- **No recovery unless you build it.** A lost phone would mean a lost year of records, which is unacceptable for exactly the person this app is for. Backups are not optional here; they are the price of not having a cloud.
- **Support is harder.** I cannot look at your data to see what went wrong. The app has to be simple enough that not much goes wrong, and the export has to be readable enough that I can ask for a copy.

The rest of this post is about paying those costs properly.

## The store is the database

State is a [Zustand](https://zustand.docs.pmnd.rs) store with the `persist` middleware, backed by on-device storage (AsyncStorage here; MMKV if you want it faster). There is no ORM, no migration runner, and no query layer, because there is no query that a plain array cannot answer for a single shop.

```ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Sale = {
  id: string;
  item: string;
  quantity: number;
  unitPriceKobo: number;
  unitCostKobo: number;
  recordedAt: string; // ISO 8601, device local time
};

type SalesState = {
  sales: Sale[];
  record: (sale: Omit<Sale, "id" | "recordedAt">) => void;
  remove: (id: string) => void;
};

export const useSales = create<SalesState>()(
  persist(
    (set) => ({
      sales: [],
      record: (sale) =>
        set((state) => ({
          sales: [
            { ...sale, id: Crypto.randomUUID(), recordedAt: new Date().toISOString() },
            ...state.sales,
          ],
        })),
      remove: (id) =>
        set((state) => ({ sales: state.sales.filter((sale) => sale.id !== id) })),
    }),
    {
      name: "mysales.sales",
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      migrate: (persisted, version) => migrateSales(persisted, version),
    },
  ),
);
```

Two things in there matter more than they look.

**Money is stored in kobo, as integers.** `unitPriceKobo`, not `unitPrice`. Floating point cannot represent most decimal prices exactly, and a profit tracker that is off by a kobo on every line is a profit tracker nobody trusts. `0.1 + 0.2` is `0.30000000000000004` in JavaScript, and it does not stop being that because you put a naira sign in front of it. Store whole kobo, do all the maths on integers, and only turn it into naira at the very edge, when it is about to be drawn on the screen:

```ts
const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

export const formatKobo = (kobo: number): string => naira.format(kobo / 100);
```

**Nothing derived is stored.** Today's revenue, this week's profit, the best-selling item: all of it is computed from the list of sales every time it is needed. It is cheap at this scale, and it means there is no "total" column that can drift away from the records it is supposed to summarise. The one number Grace actually cares about is always the sum of the lines she typed in:

```ts
export const profitKobo = (sales: Sale[]): number =>
  sales.reduce(
    (total, sale) => total + sale.quantity * (sale.unitPriceKobo - sale.unitCostKobo),
    0,
  );
```

## Versioning data you will never see again

The moment data lives only on someone else's phone, every change to its shape is a migration you have to run blind. You do not get to fix it in the database afterwards, because there is no database, only a few thousand phones you will never touch.

The `version` and `migrate` options on `persist` are the whole migration system. Each bump gets a case, and the cases run in order so a phone that skipped four updates still arrives at the current shape:

```ts
export function migrateSales(persisted: unknown, from: number): SalesState {
  let state = persisted as SalesState;

  if (from < 1) {
    // v0 stored prices as naira floats. Convert to integer kobo.
    state = {
      ...state,
      sales: state.sales.map((sale: any) => ({
        ...sale,
        unitPriceKobo: Math.round(sale.unitPrice * 100),
        unitCostKobo: Math.round(sale.unitCost * 100),
      })),
    };
  }

  if (from < 2) {
    // v1 had no cost per unit. Assume zero so profit is at least not wrong-and-hidden.
    state = {
      ...state,
      sales: state.sales.map((sale) => ({ unitCostKobo: 0, ...sale })),
    };
  }

  return state;
}
```

The rule I follow: never rename or remove a field without a migration, never let a migration throw, and never ship one without running it against an export from a real old version. A crash in `migrate` is a crash on launch, forever, for that user, with no way for them to tell you.

## Backups are the cloud

"Your data on your device" also means "your data on your device when your device is stolen". So the app can hand you your data as a single file, and take that file back on a new phone.

The file is plain JSON with an envelope around it. The envelope is the important part:

```ts
type Backup = {
  app: "mysales";
  schema: 2; // the same version number the store uses
  exportedAt: string;
  sales: Sale[];
};
```

Export writes that to a file and hands it to the system share sheet, so it can go to WhatsApp, Google Drive, an email to yourself, or a cable to a laptop; whatever the person already uses. Import does the reverse: parse, check `app` and `schema`, run it through the same `migrateSales` function as the persist layer, and then replace the store. Because import shares the migration path, a backup from an old version restores cleanly into a new one, and I only have to get migrations right in one place.

The one thing I would add to this list on day one, not day ninety: a gentle reminder to back up when the app has been used for a while and never exported. It is the only safety net there is.

## Designing for the phone in the market

None of the above is exotic. The part that is easy to get wrong is the assumptions, so here are the ones MySales makes on purpose:

1. **There is no network.** Not "slow", not "flaky". None. If a feature needs one, it is not a feature this app has.
2. **The phone is shared or borrowed sometimes.** So there is no data that would be embarrassing on a sibling's screen, and no account that could be locked out.
3. **Data costs money.** The app is small, ships no remote images, and phones home for nothing.
4. **Typing is the bottleneck.** Recording a sale is three fields and a tap. Anything that adds a fourth field needs a very good reason.
5. **Speed is trust.** The interactions that need to feel physical use [Reanimated](https://docs.swmansion.com/react-native-reanimated/) and run on the UI thread. Everything else is just fast because nothing waits.

## What I would tell you

If you are building for people whose relationship with the internet is "sometimes, and it costs me", do not start with a backend and then bolt on an offline mode. Start with the device as the source of truth, pay the backup and migration costs honestly, and add a server later if someone gives you a reason.

MySales has been on the App Store since June. Grace still opens it at the end of the day to find out whether she won. It has never once shown her a spinner.
