import type { AstRule } from "./types.js";
import { createExpressUnhandledRule } from "./rule-helpers.js";

export const noExpressUnhandled: AstRule = {
  id: "no-express-unhandled",
  name: "No Unhandled Express Routes",
  description:
    "Async Express route handlers without try/catch crash the server on errors.",
  category: "framework",
  severity: "warn",
  languages: ["js", "ts", "mjs", "cjs"],
  messageId: "express-unhandled",
  messageTemplate:
    "Async Express route may lack error handling. Wrap in try/catch or use an async error handler.",
  detect: createExpressUnhandledRule(
    "Async Express route handler may lack error handling",
  ),
};
