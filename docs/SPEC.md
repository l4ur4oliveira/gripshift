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

#### Controls

* Start
* Pause
* Restart

#### Behavior

* Default state: stopped at 60 seconds

* Start → begins countdown

* Pause → freezes time

* Restart → resets to 60 seconds and stops

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
* Very large font (e.g. text-6xl or larger)
* Bold weight

---

### Bottom Control Bar

* Fixed to bottom of screen

* Contains:

  * Timer display
  * Start button
  * Pause button
  * Restart button
  * Change Chords button

* Buttons must be:

  * Large and touch-friendly
  * Clearly separated

---

### Styling

* Dark theme only

* Tailwind slate palette:

  * Background: bg-slate-900
  * Primary text: text-slate-100
  * Secondary text: text-slate-400

* Buttons:

  * Rounded corners (rounded-2xl)
  * Large padding
  * Subtle interaction states

---

## State Management

Use React state only.

Required state:

```js
const [currentPair, setCurrentPair] = useState(["A", "C"]);
const [timeLeft, setTimeLeft] = useState(60);
const [isRunning, setIsRunning] = useState(false);
```

---

## Logic Requirements

### Timer Logic

* Use setInterval inside useEffect
* Decrease timeLeft every second when isRunning is true
* Clear interval when:

  * Timer is paused
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
3. User taps "Start"
4. Timer begins
5. User practices switching chords
6. User may:

   * Pause
   * Restart
   * Change chords anytime

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
