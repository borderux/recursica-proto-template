import type { Mode } from "../../modes";

/**
 * This prototype's modes — each swaps in a different set of handlers for
 * `/api/greetings` (see `index.tsx` and `src/api/greetings/`).
 */
export const modes: Mode[] = [
  {
    id: 1,
    name: "Default",
    description: "/api/greetings returns the sample greetings normally.",
  },
  {
    id: 2,
    name: "Empty",
    description: "/api/greetings returns 200 with no records.",
  },
  {
    id: 3,
    name: "Error",
    description:
      "/api/greetings returns a 500; the page renders an error Toast.",
  },
  {
    id: 4,
    name: "Malformed",
    description:
      "/api/greetings returns 200 with a body that violates the Greeting schema.",
  },
];
