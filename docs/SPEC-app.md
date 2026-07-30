# GripShift — Product Specification (MVP)

## Purpose

This document defines the MVP behavior for GripShift.
The AI agent must follow this as the single source of truth.

If there is ambiguity:

* Prefer simplicity
* Do not add features not listed here

---

## Overview

GripShift is a mobile-first web application designed to help users practice guitar chord transitions efficiently.

The app displays two chords at a time and provides a countdown timer to guide timed practice sessions.

The experience should be minimal, distraction-free, and optimized for quick daily use.

---

## Goals

* Help users improve chord transition speed and accuracy
* Provide a frictionless, tap-and-play experience
* Maintain a clean, visually pleasing interface (dark mode only)
* Prioritize mobile usability

---

## Tech Stack

* Frontend: React (functional components + hooks)
* Styling: Tailwind CSS
* State Management: React local state only
* No backend

---

## Core Features (MVP)

### 1. Chord Display

* Display two chords at a time

* Chords must be:

  * Centered on screen
  * Large font size for readability
  * Displayed side-by-side on landscape orientation or one above other on portrait orientation

* Default initial chord pair:

  * Use the first item from the chord list

---

### 2. Chord Randomizer

* Button: "Change Chords"

* On click:

  * Randomly select a chord pair from predefined list
  * Update displayed chords

* Constraint:

  * Do not repeat the same chord pair consecutively

---

### 3. Chord List (Static Data)

Use the following predefined chord pairs:

```
A,C 
A,G
A,E
A,Em
A,D
A,Dm
C,G
C,E
C,D
C,Dm
C,Am
C,Em
G,E
G,D
G,Dm
G,Am
G,Em
E,D
E,Dm
E,Am
D,Am
D,Em
Dm,Am
Dm,Em
Am,Em
```

Store internally as:

```js
[
  ["A", "C"],
  ["A", "G"],
  ...
]
```

---

### 4. Timer

#### Display

* 60-second countdown
* Format: MM:SS (01:00 → 00:00)
* Visual feedback progress bar reflecting remaining time

#### Controls

* Start (Lucide `Play` icon)
* Pause (Lucide `Pause` icon)
* Restart (Lucide `RotateCcw` icon)
* Start and Pause are rendered conditionally as a toggle button (Start is displayed when the timer is idle or paused; Pause is displayed when the timer is running)

#### Behavior

* Default state: stopped at 60 seconds

* Start → Triggers a 3-second regressive preparation countdown before the main 60-second timer begins.

* Pause → Freezes time.

* Restart → Resets the timer to 60 seconds, resets any active preparation countdown, and stops execution.

* 3-Second Preparation Countdown:
  * Triggered by the Start button.
  * Overlays and covers the bottom controls area.
  * Displays a large, pulsing countdown (3 → 2 → 1).
  * Features a close ("X") icon in the top-right corner to allow the user to cancel the preparation countdown and return to the paused state.
  * On completion, starts the main 60-second countdown.

* Timer must:

  * Decrease every second
  * Stop at 00:00
  * Not go below 0

---

## Layout & UI

### General Layout

* Mobile-first design
* Fullscreen height
* Use Flexbox or Grid

Structure:

* Main area:

  * Two chords centered on screen

* Bottom area:

  * Fixed control bar

---

### Chord Section

* Two equal columns
* Centered vertically and horizontally
* Very large font (e.g. `text-6xl` up to `text-8xl`) using `font-oswald font-black` for maximum readability
* Accent colors for visual differentiation:
  * Chord A (Origin): `text-brandCrimson`
  * Chord B (Destination): `text-brandWhite`

---

### Bottom Control Bar

* Fixed to bottom of screen

* Uses a flexible responsive design that centers and constrains the layout on larger screens (`w-full lg:w-4xl mx-auto`).

* Layout splits controls horizontally on wider views:
  * Left/Main area: Visual progress bar stacked above the timer display and control icons.
  * Right/Side area: "Change Chords" button.

* Contains:

  * Visual Progress Bar: A clean progress bar (`h-2 bg-brandBlack border border-brandSilver/10 rounded`) with a sliding progress fill in brand crimson (`bg-brandCrimson`) with a smooth continuous sliding transition (`transition-all duration-1000 ease-linear`) indicating remaining time.
  * Timer display: `00:00` digital mono layout using `font-oswald` and `text-brandWhite`.
  * Start / Pause conditional toggle button: Center-aligned Lucide icon (`Play` / `Pause`) in a `w-14 h-14` rounded touch target using brand card background (`bg-brandCard hover:bg-brandBlack border border-brandSilver/10 text-brandWhite`).
  * Restart button: Lucide icon (`RotateCcw`) in a `w-14 h-14` rounded touch target using brand card background (`bg-brandCard hover:bg-brandBlack border border-brandSilver/10 text-brandSilver hover:text-brandWhite`).
  * Change Chords button: Large text-based action button using `font-oswald` and `bg-brandCrimson hover:bg-red-700 text-brandWhite`.
  * Preparation Countdown Overlay: An absolute overlay container covering the bottom control block when the preparation countdown is active, containing a cancel `X` icon button in the top-right corner.

* Control targets must be:

  * Large and touch-friendly (`w-14 h-14` for icon buttons, wide padding for Change Chords)
  * Clearly separated

---

### Styling

* Dark theme only

* Brand Palette:

  * Base Background: `bg-brandBlack` (`#0E0E0E`)
  * Card/Overlay Background: `bg-brandCard` (`#161616`)
  * Primary Text / Active Elements: `text-brandWhite` (`#F5F5F5`)
  * Secondary Text / Inactive Labels: `text-brandSilver` (`#C0C0C0`)
  * Accent / Focus Action: `bg-brandCrimson` / `text-brandCrimson` (`#B11226`)

* Typography:

  * Headings, chord letters, and primary buttons: `font-oswald` (Oswald)
  * Body copy and interface details: `font-sans` (Open Sans)

* Buttons & Controls:

  * Subtle rounded corners (`rounded` or `rounded-md`)
  * Large padding / precise dimensions (`w-14 h-14` for icons)
  * Clear interactive states (e.g. `hover:bg-red-700` for crimson button, `bg-brandBlack` and border color changes for card controls)

---

## State Management

Use React state only.

Required state:

```js
const [currentPair, setCurrentPair] = useState(["A", "C"]);
const [timeLeft, setTimeLeft] = useState(60);
const [isRunning, setIsRunning] = useState(false);
const [prepCountdown, setPrepCountdown] = useState(null); // null, 3, 2, or 1
```

---

## Logic Requirements

### Timer Logic

* Main countdown: Use setInterval inside useEffect to decrease `timeLeft` every second when `isRunning` is true.
* Preparation countdown: Use setInterval inside useEffect to decrease `prepCountdown` every second when `prepCountdown` is not null.
* When `prepCountdown` transitions below 1:
  * Set `prepCountdown` to `null`
  * Set `isRunning` to `true` to begin the main timer.
* Clear intervals when:

  * Timer is paused / cancelled
  * Timer reaches 0
  * Component unmounts

---

### Chord Change Logic

* Select random index from chord list
* Ensure new pair is different from currentPair

---

## User Flow

1. User opens the app
2. Sees:

   * Two chords
   * Timer at 01:00
3. User taps **Start** (Play icon)
4. A 3-second preparation countdown is shown covering the controls area. The user can tap "X" to cancel it.
5. If not cancelled, the preparation countdown finishes and the main timer begins.
6. User practices switching chords.
7. User may:

   * Pause (Pause icon)
   * Restart (RotateCcw icon)
   * Change chords anytime

---

## Metadata

The app page (`/app`) inherits the root layout's metadata defined in `src/app/layout.jsx`, which includes:
* Page title and description
* Open Graph tags (`og:title`, `og:description`, `og:image`, etc.)
* Twitter Card tags (`summary_large_image` card)
* Favicon reference

The social sharing image (`/social-image.jpg`) and SEO values are shared with the landing page.

---

## Constraints

* Do NOT introduce external state libraries
* Do NOT add backend
* Do NOT add authentication
* Do NOT add features not described in this document
* Keep everything client-side
* Keep UI minimal and focused
* Prioritize mobile-first layout

---

## Future Enhancements (Out of Scope)

* Custom timer duration
* Auto-rotation of chords
* Progress tracking
* Metronome
* Favorites or filtering
* Animations between chord transitions
