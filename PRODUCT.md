# Product

## Register

product

## Users

Indonesian vocational high-school students (class XI RPL) and their teachers. Students check in between classes or at night: what's due today, where am I weak, what should I practice. Teachers manage up to three classes of ~35 students: collect assignments, grade them, share materials, and generate quizzes. Sessions are short and task-focused; the app is used on school laptops and personal computers at ~1356–1920px viewports.

## Product Purpose

Grafidu connects grades, teacher materials, assignments, and AI recommendations so students can act on weak areas — and teachers can see what the class needs. Success: a student opens the app and immediately knows the next study action; a teacher sees who needs follow-up without stitching data together.

## Brand Personality

Clear, calm, purposeful. Voice comes from the landing page: "A clearer way to learn", "Know where you are. Know what to do next." Confident without being loud; purple is the single brand color and earns its place through action, not decoration.

## Anti-references

- "No maze of menus. No pile of disconnected tools." (stated in the landing copy itself)
- Generic admin-dashboard templates: walls of identical stat cards, decorative charts, fake enterprise chrome.
- Over-decorated edtech gamification (badges, confetti, cartoon mascots).

## Design Principles

1. **Learning data should lead somewhere** — every screen ends in a next step (Buat To-Do List, Grade, Generate Kuis).
2. **One question: what needs attention** — surface the exception (weak subject, missing submission) before the aggregate.
3. **Calm density** — real school data is dense; whitespace and a restrained palette keep it readable.
4. **Consistent component vocabulary** — same button, pill, table, and card language across all 16 screens.
5. **Fidelity to the GRAFIDU identity** — the Figma is the source of truth; improvements refine, never restyle.

## Accessibility & Inclusion

WCAG AA for body text and interactive controls. Full keyboard operability for menus, dialogs, accordions, and forms; visible focus states. `prefers-reduced-motion` respected on every animation. Status communicated by text label, never color alone (pills carry words: "Atas Rata Rata" / "Bawah Rata Rata").

## Register note

The public landing page (index.html) is a brand surface and stays pixel-faithful to the Figma; all dashboard/auth pages are product surfaces. Product-register rules apply to dashboard work; the landing only receives motion, a11y, and responsiveness refinements.
