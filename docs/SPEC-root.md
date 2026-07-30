# GripShift Landing Page — Product Specification

## Purpose

This document defines the behavior and content of the GripShift Landing Page (Homepage).
The AI agent must follow this as the single source of truth.

If there is ambiguity:

* Prefer simplicity
* Do not add features not listed here

---

## Overview

The GripShift Landing Page is a clean, minimal, and responsive homepage designed to introduce the GripShift concept, explain the methodology, and direct users to the practice session.

It maintains the same visual identity and styling system as the core application (dark mode, typography, color palette) to create a cohesive user experience.

---

## Goals

* Introduce GripShift as an open-source, distraction-free chord practice tool
* Explain the 1-minute chord transition methodology
* Direct users seamlessly to the practice application at `/app` path
* Maintain visual consistency with the application

---

## Tech Stack

* Frontend: React (functional components + hooks)
* Styling: Tailwind CSS
* No backend

---

## Page Sections

### 1. Header / Navigation

* **Branding / Logo**:
  * Displays the SVG logo from `public/logo.svg`.
  * Action: Clicking returns the user to the landing page.

* **Navigation Links**:
  * "The Concept" (scrolls to the About section `#concept`)
  * "How It Works" (scrolls to the Methodology/How it Works section `#how-it-works`)
  * "Inspiration" (scrolls to the JustinGuitar Homage section `#inspiration`)
  * "GitHub" (opens external link in a new tab; displays only a brand-crimson GitHub icon, slightly larger than text links, with no label)

* **Call to Action (CTA) Button**:
  * Text: "Start Practice" followed by a Lucide `play` icon (`[ Start Practice > ]`).
  * Action: Navigates to `/app` path.

---

### 2. Hero Section

* **Promo Badge**:
  * An inline tag displaying a pulsing dot and the text "100% Free & No Sign-up".

* **Main Headline**:
  * "Master guitar chord transitions." (with "transitions" highlighted in crimson).

* **Supporting Copy**:
  * "A minimalist tool designed for guitar players to accelerate muscle memory. Based on the proven 1-minute chord change exercise."

* **Action Buttons**:
  * Primary button: "Open Practice App" followed by a Lucide `play` icon (`[ Open Practice App > ]`). Action: Navigates to `/app` path.
  * Secondary button: "Learn More". Action: Scrolls smoothly to the About section (`#concept`).

---

### 3. Hero Preview Image

* Displays a static preview image using the file `public/hero-image.jpg`.

---

### 4. About Section (`#concept`)

* **Subtitle**: "The Motivation Behind the Project" in brand crimson.

* **Headline**: "Why are my chord changes so slow?"

* **Body Copy**:
  * Detailed paragraphs describing the primary obstacle for beginner guitarists (muscle memory) and how GripShift addresses this by removing visual clutter, ads, and login forms.

---

### 5. Methodology / How It Works (`#how-it-works`)

* **Section Title**: "The 1-Minute Practice"

* **Section Subtitle**: "Simple steps to transform your finger speed with the ideal study method."

* **Steps Grid** (3 items):
  * **01: Random Chord Pair**: Explains that the app randomly selects two chords to practice.
  * **02: Start GripShift**: Explains starting the 1-minute timer and practicing chord transitions.
  * **03: Beat Your Score**: Explains counting changes, aiming for a target of 30 transitions per minute.

---

### 6. JustinGuitar Homage (`#justinguitar`)

* **Subtitle**: "Inspiration & Pedagogy" in brand crimson.

* **Headline**: "A Homage to the JustinGuitar Course"

* **Body Copy**:
  * Details the pedagogical inspiration behind GripShift from Justin Sandercoe's "One Minute Changes" exercise.
  * Link: External link "Visit JustinGuitar.com" (opens in a new tab with a Lucide `external-link` icon).

---

### 7. Bottom Call to Action (CTA)

* **Headline**: "Ready to start improving?"

* **Body Copy**:
  * "Take just 1 minute a day. Your fingers will thank you when playing your favorite songs."

* **CTA Button**:
  * Text: "Enter GripShift" followed by a Lucide `play` icon (`[ Enter GripShift > ]`).
  * Action: Navigates to `/app` path.

---

### 8. Footer

* **Project Info**: Explains the open-source purpose of the tool.

* **Credit**:
  * References the developer of the project.
  * Credits the "One Minute Changes" methodology by JustinGuitar with a link to their site.
  * Includes a link button to the project's GitHub repository featuring the GitHub Lucide icon.

---

## Layout & UI

### General Layout

* Mobile-first design
* Container constraints (`max-w-6xl` or `max-w-4xl` centered with `mx-auto`)
* Use Flexbox or Grid for section alignments

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
  * Clear interactive states (e.g. `hover:bg-red-700` for crimson buttons)

---

## State Management

Since this is a static informational page, state requirements are minimal:

* No active view state is required on the landing page.

---

## Logic Requirements

* Navigation: Clicks on "Start Practice", "Open Practice App", and "Enter GripShift" must navigate the user to the `/app` path.
* Smooth scroll navigation: Clicks on anchor links ("The Concept", "How It Works", "Inspiration", "Learn More") must scroll smoothly to their respective section anchors, offset by the sticky header height (80px).

---

## User Flow

1. User opens the homepage
2. Views branding logo, navigation, hero section, and static preview image
3. Scrolls down to read about the motivation, steps, and homage
4. Clicks any primary CTA ("Start Practice", "Open Practice App", or "Enter GripShift") to navigate to the practice application at `/app`

---

## Constraints

* Do NOT introduce external state libraries
* Do NOT include the practice application prototype (`#app-section`) or its logic in the homepage specifications
* Keep everything client-side
* Prioritize mobile-first layout

---

## SEO & Social Sharing

* **Title**: "GripShift - Master Your Chord Transitions"
* **Description**: "A minimalist, high-performance tool for guitar players to accelerate muscle memory with the 1-minute chord transition exercise."
* **Open Graph**:
  * `og:site_name`: "GripShift"
  * `og:type`: "website"
  * `og:url`: `https://gripshift-app.vercel.app/`
  * `og:title`: matches page title
  * `og:description`: matches page description
  * `og:image`: `/social-image.jpg` (1200×630 JPEG)
  * `og:locale`: `en_US`
* **Twitter Card**:
  * `twitter:card`: `summary_large_image`
  * `twitter:title`: matches page title
  * `twitter:description`: matches page description
  * `twitter:image`: `/social-image.jpg`

---

## Future Enhancements (Out of Scope)

* Multi-language support (English/Portuguese toggle)
* Dark/Light mode toggle (must remain dark mode only)
