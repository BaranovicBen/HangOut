# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# meetMe
Building a native, private, cross-platform calendar coordination app for young adults who want to spend time together but struggle to align schedules — regardless of which calendar tools they use.

## Architecture design plan:
[HangOut-ArchitecturePlan-v1.docx](https://github.com/user-attachments/files/21382845/HangOut-ArchitecturePlan-v1.docx)

### Draft 1 of UI/X Design:
[meetME UI.pdf](https://github.com/user-attachments/files/21382872/meetME.UI.pdf)

### Draft 2 of UI/X Design:
[meetME UI-2.pdf](https://github.com/user-attachments/files/21382874/meetME.UI-2.pdf)

### Draft 3 of UI/X Design:
[meetME UI-3.pdf](https://github.com/user-attachments/files/21382885/meetME.UI-3.pdf)

## Draft 4 of UI/X Design:
[meetME UI-4.pdf](https://github.com/user-attachments/files/21382858/meetME.UI-4.pdf)


## Market Research 
Perfect, I’ll now research how apps like Duolingo, Phantom, Revolut, and corporate tools like Calendly, ClickUp, and When2Meet create emotional engagement through mascots, animations, haptics, and personalization. I’ll also analyze how Gen Z and young adults respond to these techniques, and propose how you can apply them in your app—HangOut.

Expect guidance on:

* UI personalization techniques for emotional and social connection
* Mascot ideas that are appealing but not cringey
* Specific animation/haptic examples for dopamine triggers
* Future social and gamification features

I’ll get back to you with a detailed report and clear action steps shortly.


# UI Personalization and Emotional Resonance

HangOut’s current monochrome/green theme feels sleek but can seem impersonal.  To appeal to Gen Z, introduce **vibrant accents and personalization options** – for example, allow custom theme colors or background images for each group. Gen Z craves *“rich visuals”* and emojis/animations in apps, so adding subtle bursts of color (e.g. a pastel or neon accent for buttons and highlights) and playful illustrations can make the UI feel warmer.  Consider showing friends’ profile pictures or avatars prominently on meetup invites, and use emoji reactions/stickers liberally in chat and notifications.  This follows best practices: Duolingo mixes bright greens and yellows and uses a friendly cartoon owl to feel playful, and other Gen Z-focused apps lean into bold, authentic visuals rather than ultra-minimalist palettes.  In practice, HangOut might swap its solid-green highlights for gradient or complementary hues on each page, display friendly iconography (smiling avatars, fun badges), and use casual, conversational text (e.g. “Jane 😎 thinks a movie night sounds awesome!”) so users feel the app has personality tailored to them.

## Micro-interactions, Animations and Haptics

Small, delightful animations and feedback can greatly boost enjoyment without overwhelming the user.  For instance, Duolingo rewards lesson completion with a **confetti blast** and a pulsing progress bar for each correct answer.  HangOut can mimic this by adding a quick sparkle animation or “pop” effect when a user successfully schedules or RSVPs to an event, or a confetti burst when an event is created or filled.  Similarly, use **progress indicators** (pulsing bars or checkmark animations) during RSVP steps to give a sense of accomplishment.  Gentle **sound cues** or **vibrations** on key actions (a soft “ding” and light haptic tap on RSVP, for example) can create a dopamine hit; Duolingo’s “chirps” and Duo’s cute voice for correct answers are good examples.  Importantly, keep these feedbacks subtle – as a Duolingo designer advises, *“Less is more. Opt for clean animations, well-chosen sound effects, or subtle haptic feedback instead of bombarding users with sensory overload.”*  In practice, avoid full-screen animations or loud sounds; instead use brief, joyful accents (confetti, sparkle, small bounce) and quick vibrations on successful taps. This way the app feels lively and rewarding (akin to Duolingo’s “celebrations”) without feeling gimmicky or annoying.

## Mascot and Brand Character

A friendly mascot can humanize HangOut and make it relatable.  Duolingo’s green owl **Duo** is beloved by Gen Z for its humor and personality, and Phantom Wallet’s ghost mascot was redesigned as a “trusted companion” to make crypto feel approachable.  HangOut should pick a **“cute but not cringe”** character – likely an extroverted social animal.  For example, a playful puppy, curious otter, or sociable primate character could work.  It should be drawn in a simple, modern cartoon style (bright solid colors, friendly eyes, big smile) and used sparingly: maybe popping up in tutorials or confirmation screens saying things like “Let’s go!” or giving a thumbs-up.  The tone should be light and authentic (think a character texting a meme, not a stiff corporate icon).  Gen Z responds to mascots that feel humorous and real, so avoid overly polished or “marketing” wording.  The mascot can also incorporate the app’s green accent and be active on social media or in notifications to build community feel. Overall, the mascot should embody fun and friendship (e.g. an otter giving a high-five or an owl giving a wink) rather than something cheesy.

## Future Social/Gamified Features

After launch, add light gamification that rewards core HangOut behaviors.  For example, award **points or XP** whenever a user organizes or attends a meetup, letting them “level up” as a host.  Many top apps use exactly this – Duolingo grants XP and levels for lessons, and even bars like Nike Run Club use achievements and streaks to keep people coming back.  HangOut could similarly introduce **badges or titles**: e.g. a **“First Hangout”** badge for the first event organized, “Social Butterfly” for inviting 10 friends, or “Party Starter” for a streak of weekly meetups.  A simple **streak counter** (e.g. consecutive weeks of hosting or attending an event) taps into habit-building mechanics.  StriveCloud notes that Duolingo’s daily streaks make users *“3× more likely to return”*; even a modest hangout streak (with gentle reminders like “You’ve planned 4 weekends in a row!”) could motivate consistency.

Social feedback loops and personalization will also help engagement.  HangOut could surface **suggestions** like “Lucia is free this weekend – want to plan something?” as a push notification or in-app banner.  Revolut’s app famously sends timely personalized messages (e.g. “Welcome home!” after a trip) which deepen user relationships.  Analogously, HangOut could use calendar data or recent activity to notify users of friends’ availabilities or upcoming common free time, making coordination feel effortless.  Finally, incorporate **seasonal challenges and rewards**: limited-time badges or mini-events for holidays.  For instance, an autumn **“Spooky Hangout”** badge for hosting a Halloween get-together, or a summer **“Festival Fan”** badge for meeting up during a music festival season.  Many apps gamify seasonality – Duolingo runs monthly/holiday badges that users eagerly chase – and YodelMobile advises that *“seasonal badges and rewards”* (like Advent calendars or special holiday challenges) create urgency and stickiness.  Implementing these features early (points, badges, simple leaderboard among friends, smart notifications) will give HangOut a playful, social layer proven to resonate with Gen Z.

**Sources:** Analysis of Duolingo’s, Phantom Wallet’s, Revolut’s, Calendly’s, ClickUp’s and When2Meet’s design and engagement strategies. These informed the above actionable recommendations.

## The maskot will be otter possible names are:
**🦦 Top Name Suggestions for Your Otter Mascot**

**Name	Style	Why It Works**
Hugh	Classic, chill	Feels human, smart, and low-key friendly. “Hugh the HangOut Otter” has nice alliteration.
Ollie	Playful, Gen Z-friendly	A common otter name; warm and fun. Easy to animate and brand.
Otto	Punny, clean	Short, clever take on “otter.” Otto the Otter rolls off the tongue.
Ozzy	Quirky, memorable	Edgy but cute — gives the mascot some personality without being cringey.
Milo	Soft, approachable	Popular among Gen Z — cute without sounding fake.


