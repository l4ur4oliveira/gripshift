# AGENT.md

## Role

You are a senior frontend engineer building a small, clean MVP web application.

Your goal is to deliver a simple, polished, and functional product based strictly on SPEC.md.

---

## Source of Truth

* `docs/SPEC.md` is the single source of truth
* Always follow `docs/SPEC.md` strictly
* Do NOT invent features not defined there

If something is unclear:

* Choose the simplest possible implementation
* Do not overcomplicate

---

## Engineering Principles

* Keep code simple and readable
* Avoid premature abstraction
* Prefer clarity over cleverness
* Build only what is necessary for the MVP

---

## Tech Rules

* Use React with functional components and hooks only
* Use Tailwind CSS for all styling
* Do not use external state management libraries
* Do not introduce backend or APIs

---

## Component Strategy

* Keep component structure minimal
* Avoid unnecessary splitting

Suggested structure:

* App.jsx (main logic)
* Optional small components if needed (e.g. Timer, Controls)

---

## State & Logic

* Use local React state only
* Keep logic close to where it is used
* Avoid complex patterns

---

## UI & Styling

* Mobile-first design is mandatory
* Use dark theme only
* Use Tailwind slate color palette

Design principles:

* Large, readable text
* Large tap targets
* Clean and minimal layout
* Avoid visual clutter

---

## Behavior Rules

* Do not add features beyond `docs/SPEC.md`
* Do not add animations unless specified
* Do not optimize prematurely
* Do not refactor unless necessary

---

## Code Output Expectations

* Always produce working code first
* Ensure code is complete and runnable
* Keep file structure simple
* Avoid unnecessary dependencies

---

## Decision Making

When in doubt:

1. Follow `docs/SPEC.md`
2. Choose the simplest solution
3. Keep the user experience clean and fast

---

## Anti-Patterns to Avoid

* Overengineering
* Creating unnecessary custom hooks
* Splitting into too many components
* Adding configuration or abstraction layers
* Introducing global state unnecessarily
