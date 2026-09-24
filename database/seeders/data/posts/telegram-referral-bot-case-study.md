---
title: "How a referral bot helped a crypto community grow on Telegram"
date: "2026-09-24"
excerpt: "A crypto airdrop creator wanted to grow on Telegram without paid ads. I built a referral bot for it: 12 bots later, 2.9M+ users reached."
tags: ["Case study", "Bots", "Telegram", "Automation"]
---

A crypto airdrop content creator came to me with a growth problem. Their community lived on Telegram, spread across several channels and group chats, and they wanted it to be bigger. They did not want to pay for ads to get there.

This is what I built for them, how it works, and what the numbers looked like twelve bots later.

## The problem

Airdrop communities run on attention. A new campaign goes live, people rush to find out about it, and the channels that already have a large, active audience are the ones that benefit.

The client had the content and a loyal core of members. What they did not have was a way to grow that did not depend on people stumbling onto the channels by themselves.

Paid ads were ruled out from the start. Crypto advertising is expensive, often restricted, and the people it brings in tend to leave when the campaign ends.

What the client did have was members who trusted them. So the question became: how do you turn those members into the growth channel?

## What I built

A Telegram referral bot. The idea is simple:

- Every member who starts the bot gets a personal invite link.
- When someone joins through that link, the member who shared it gets credit.
- Credit turns into rewards, and a leaderboard shows who has brought in the most people.

The personal link gives members a reason to share. The rewards give them a reason to keep sharing. The leaderboard makes it a competition, which matters in a community that already enjoys chasing the next airdrop.

## Key features

### An admin panel the client runs themselves

Everything day to day happens in an admin panel, without the client needing me:

- **Leaderboard:** view the rankings and manage them.
- **Connected channels:** add or remove the Telegram channels and chats the bot works with.
- **Coin and reward setup:** choose what members earn and how rewards are set up for each campaign.

### Rewards are configuration, not code

The reward type is set from the panel. It is not hard-coded for one client or one campaign.

That sounds like a small detail, but it shapes everything after the first launch. When the client wants a new bot for a new campaign, most of the change is settings rather than new code.

### Tech stack

- **NestJS and TypeScript** for the bot itself, with **PHP** on parts of the backend.
- **MySQL** for members, referrals, rewards and the leaderboard.
- **Redis and RabbitMQ** for queued work, so a rush of new joins when a campaign goes live does not slow the bot down for everyone else.
- **Docker** to package and deploy each bot the same way, which matters when there are twelve of them.

## Results

These numbers cover over three years of working with this client.

- **12 bots** built for this client. They came back after the first one, and kept coming back.
- **2.9M+ users reached** across 12 bots.
- **1.3M+ active users**, about 45% of everyone reached.
- **1.25M+ users** on the largest single bot.
- **11 language groups**, including EN, FA, RU, ID, AR, FR and more.

A note on how these are counted: user counts are per bot. If one person uses two of the bots, they are counted twice. That is why I say "users reached across 12 bots" and not "2.9 million people".

The active figure is the one I pay the most attention to. Reach is easy to inflate. Nearly half of those users being active is what tells me the referrals brought in real people and not just clicks.

## What I learned

**Make the thing that changes a setting.** The first version of any bot tends to hard-code the parts that feel fixed. Rewards were never going to stay fixed from one campaign to the next, so they went into the admin panel. That is what made a second bot, and then a twelfth, straightforward.

**Report the honest number next to the big one.** Total users reached looks good on a slide. Active users is the number that says whether the growth was real. I now report both, and explain how they are counted, from the start.

**Plan for many languages early.** The community ended up spread across 11 language groups. Text that lives in one place and can be translated is much cheaper to set up on day one than to retrofit on bot number six.

## Need a referral bot for your community?

If you run a Telegram community and want it to grow through the people already in it, I can build one for you, with an admin panel you control.

[Book a call](https://cal.com/destiny-ezenwata/work-chat) and tell me about your community.
