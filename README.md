# recursica-proto-template

An app for designers to spin up quick, throwaway UI prototypes with AI
agents, built on the Recursica design system. Home (`/`) lists every
prototype in the project; each one lives at its own `/prototypes/<slug>`
page and can't affect any other.

## Getting started

```bash
npm install
npm run dev
```

## Adding a prototype

See `docs/PROTOTYPE.md` for the process — what to ask the designer about
data, APIs, and modes before building. Mechanically:

1. Create a folder: `src/routes/prototypes/<slug>/index.tsx`. `<slug>`
   becomes the URL — `demo` → `/prototypes/demo`.
2. Default-export your page component.
3. Optionally add a title/description shown on the Home card:
   ```tsx
   export const meta = { title: "My Prototype", description: "..." };
   ```

That's it — no other files to touch. Home and routing pick it up
automatically. See `src/routes/prototypes/demo/` for an example.

See `ARCHITECTURE.md` for the full tooling/infra breakdown, and
`AGENT.md` for rules AI agents follow when working in this repo.
