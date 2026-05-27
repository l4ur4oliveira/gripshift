# Next.js Migration Guide

This document details the step-by-step plan to migrate the GripShift project from a Vite-based React Single Page Application (SPA) to a Next.js application using the **App Router** paradigm.

## Goal
1. **Root Route (`/`)**: A static, fast, responsive landing page based on `docs/SPEC-root.md` (to be created next) for SEO, branding, and explaining the training methodology.
2. **Practice App Route (`/app`)**: The interactive guitar chord transition practice tool currently located in `src/App.jsx`. The application must remain structurally and logically identical to the existing implementation.
3. **Architecture**: Clean, minimalist MVP built on Next.js, React 19 (or latest Next.js default React version), and Tailwind CSS v4.

---

## Directory Structure Changes

The following structure illustrates the transition from the current Vite project to the Next.js App Router structure:

### Current Structure (Vite)
```text
grip-shift/
├── docs/
│   ├── SPEC-app.md
│   └── SPEC-root.md
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── static/
│   └── index.html
├── index.html
├── package.json
└── vite.config.js
```

### Target Structure (Next.js App Router)
```text
grip-shift/
├── docs/
│   ├── MIGRATION.md
│   ├── SPEC-app.md
│   └── SPEC-root.md
├── public/
├── src/
│   ├── app/
│   │   ├── app/
│   │   │   └── page.jsx      <-- Practice App (/app)
│   │   ├── globals.css       <-- Combined global CSS with Tailwind v4
│   │   ├── layout.jsx        <-- Root Layout (Metadata, Google Fonts, SEO)
│   │   └── page.jsx          <-- Static Homepage (/)
│   └── components/           <-- (Optional, if shared UI is needed)
├── package.json
└── next.config.js
```

---

## Step-by-Step Migration Plan

### Step 1: Package and Dependency Setup

1. **Uninstall Vite and related packages**:
   Remove Vite and its plugins to keep `package.json` clean.
   ```bash
   npm uninstall vite @tailwindcss/vite @vitejs/plugin-react eslint-plugin-react-refresh
   ```

2. **Install Next.js and Tailwind CSS (Next.js Integration)**:
   Add Next.js dependencies. We will preserve React 19 and Tailwind CSS v4, which are fully compatible with Next.js 15.
   ```bash
   npm install next@latest
   ```

3. **Update Scripts**:
   Modify `package.json` to replace Vite commands with Next.js commands:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "next lint"
   }
   ```

---

### Step 2: Configure Next.js and Tailwind CSS v4

1. **Create `next.config.js`**:
   Keep configuration minimal to avoid overengineering.
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
   };

   module.exports = nextConfig;
   ```

2. **Tailwind CSS v4 Integration**:
   Next.js 15+ seamlessly supports Tailwind CSS v4. Standard CSS `@import "tailwindcss";` in global CSS works natively.

---

### Step 3: Layout and Global Styling

1. **Create `src/app/globals.css`**:
   Import Tailwind CSS v4 and define brand styles and color tokens (migrated from `src/index.css`):
   ```css
   @import "tailwindcss";

   @theme {
     --color-brandBlack: #0E0E0E;
     --color-brandWhite: #F5F5F5;
     --color-brandSilver: #C0C0C0;
     --color-brandCrimson: #B11226;
     --color-brandCard: #161616;

     --font-sans: var(--font-open-sans), sans-serif;
     --font-oswald: var(--font-oswald), sans-serif;
   }

   body {
     margin: 0;
     padding: 0;
     background-color: var(--color-brandBlack);
     color: var(--color-brandWhite);
   }
   ```

2. **Create Root Layout (`src/app/layout.jsx`)**:
   Implement standard Next.js Google Fonts optimization for `Open Sans` and `Oswald`, and establish essential global SEO metadata in English:
   ```jsx
   import { Open_Sans, Oswald } from 'next/font/google';
   import './globals.css';

   const openSans = Open_Sans({
     subsets: ['latin'],
     weight: ['300', '400', '500', '600', '700', '800'],
     variable: '--font-open-sans',
   });

   const oswald = Oswald({
     subsets: ['latin'],
     weight: ['300', '400', '500', '600', '700'],
     variable: '--font-oswald',
   });

   export const metadata = {
     title: 'GripShift - Master Your Chord Transitions',
     description: 'A minimalist, high-performance tool for guitar players to accelerate muscle memory with the 1-minute chord transition exercise.',
     viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
   };

   export default function RootLayout({ children }) {
     return (
       <html lang="en" className={`${openSans.variable} ${oswald.variable}`}>
         <body className="antialiased min-h-screen bg-brandBlack text-brandWhite selection:bg-brandCrimson selection:text-brandWhite">
           {children}
         </body>
       </html>
     );
   }
   ```

---

### Step 4: The Homepage Route (`/`)

1. **Create `src/app/page.jsx`**:
   This page is a server-side static component by default. It will render the high-converting, gorgeous, and SEO-friendly landing page defined in `docs/SPEC-root.md`.
   - Utilize standard React JSX layout based on `docs/SPEC-root.md`.
   - Include standard CTA buttons navigating to `/app`.
   - Maintain the fast-loading static design.

---

### Step 5: The Practice App Route (`/app`)

1. **Create `src/app/app/page.jsx`**:
   The practice app requires rich interactive state, active timers, and interactive hooks. Thus, it **must** be a client component.
   
   Declare `'use client';` at the absolute top of the file, and copy the **exact** component code currently inside `src/App.jsx`.

   ```jsx
   'use client';

   import React, { useState, useEffect } from 'react';
   import { Play, Pause, RotateCcw, X } from 'lucide-react';

   const CHORD_PAIRS = [
     ["A", "C"], ["A", "G"], ["A", "E"], ["A", "Em"], ["A", "D"], ["A", "Dm"],
     ["C", "G"], ["C", "E"], ["C", "D"], ["C", "Dm"], ["C", "Am"], ["C", "Em"],
     ["G", "E"], ["G", "D"], ["G", "Dm"], ["G", "Am"], ["G", "Em"],
     ["E", "D"], ["E", "Dm"], ["E", "Am"],
     ["D", "Am"], ["D", "Em"],
     ["Dm", "Am"], ["Dm", "Em"],
     ["Am", "Em"]
   ];

   export default function PracticeApp() {
     // ... Keep the exact same state, hooks, and handler code from src/App.jsx ...
     // Do not modify any logic or existing UI code.
   }
   ```

---

## Technical Constraints and Guidelines (The "Don'ts")

* **Do NOT change the Practice App**: Do not change the internal state keys, countdown intervals, chord list array, or logic from `src/App.jsx`. It must perform exactly as it did under Vite.
* **Do NOT persist data unnecessarily**: The practice session statistics should reside solely in standard transient React state. Do not implement persistent databases, API connections, or cookies unless requested later.
* **Do NOT add external state libraries**: Keep state locally scoped inside `PracticeApp` using React `useState` and `useEffect`.
* **Do NOT overengineer layouts**: Avoid creating deep component hierarchies, unnecessary routing layouts, or complicated dynamic configurations. Stick to simple pages (`page.jsx`) and clean layouts (`layout.jsx`).
* **Do NOT introduce animations unless specified**: Avoid standard Framer Motion or extra CSS transitions, relying only on Tailwind's core styles and basic CSS animations (such as `pulse`) specified in the SPEC.
