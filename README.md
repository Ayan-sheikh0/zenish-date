# Zenish, will you go on a date? ❤️

A premium, romantic, page-by-page date invitation site. Candlelit "love letter" theme — deep
wine/gold night palette, twinkling stars, drifting petals, an envelope you break the seal on to
reveal the question, and a NO button that only ever moves (never disappears, works cleanly on
mobile touch).

Built with React + Vite + Tailwind + React Router + Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## The flow (real pages, real navigation — not tabs)

- `/` — break the seal, then the YES/NO question
- `/food` — choose food (multi-select)
- `/place` — choose place (multi-select)
- `/when` — pick a day (next 10 days) and a time of day
- `/final` — the summary + "Our Date Is Official" celebration

**There is no "Continue" button anywhere in the selection pages.** As soon as she taps an option,
the app waits about a second (so she can still tap more than one thing, or on the `/when` page,
pick both a day and a time) and then automatically navigates to the next page on its own. A small
gold status line ("moving on...") shows briefly instead of a button.

A "← back" link stays at the bottom of each page if she wants to change something — that's just a
way back, not a continue button.

Direct-linking or refreshing on a later page before finishing the earlier steps bounces back to the
right earlier page automatically, so the flow can't be skipped.

## The NO button

- It never disappears — it's always rendered, always on-screen.
- It only *moves* to a new random spot within the card when touched, clicked, or hovered.
- On touch devices it uses a single unified `pointerdown` handler (not separate click/touch
  handlers), so one tap = one clean move — no double-jumping, no chance of it registering as a
  press.

## Customizing photos

Open `src/data/config.js`. Every food/place/time option has an `image` field set to `null`, which
shows the emoji + gold-card look (so nothing ever shows a broken image). To use your own real
photos:

1. Put image files in `src/assets/food/` or `src/assets/places/`
2. Import them at the top of `config.js`
3. Set `image` to the imported variable for that item

## Customizing music

Add an mp3 to `public/music/`, then set `MUSIC_SRC` in `src/data/config.js` to that path, e.g.
`'/music/romantic-theme.mp3'`. The play/pause button in the top-right lights up automatically.

## Project structure

```
src/
  data/config.js          <- all editable content (name, food/place/time lists, images, music)
  context/DateContext.jsx <- shared state + localStorage persistence (now includes date & time)
  hooks/useAutoAdvance.js <- the "no continue button, auto page-change" logic
  components/
    AmbientBackground.jsx <- twinkling stars + drifting petals
    Chrome.jsx             <- Frame / BackLink / Ornament shared bits
    ProgressIndicator.jsx  <- 5-step dot tracker
    SelectCard.jsx         <- food/place/time option card
    MusicPlayer.jsx
  pages/
    LandingPage.jsx  <- envelope seal -> question -> YES/NO
    FoodPage.jsx
    PlacePage.jsx
    WhenPage.jsx      <- NEW: date strip + time-of-day
    FinalPage.jsx
  App.jsx             <- routes + guards for the 5-step flow
```
