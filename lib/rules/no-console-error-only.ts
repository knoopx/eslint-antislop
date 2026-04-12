import type { AstRule } from "./types.js";
import { createConsoleOnlyErrorRule } from "./rule-helpers.js";

export const noConsoleErrorOnly: AstRule = {
  id: "no-console-error-only",
  name: "No Console-Only Error Handling",
  description:
    "Catch blocks that only console.log/error without rethrowing or returning are incomplete error handling.",
  category: "error-handling",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "no-console-error-only",
  messageTemplate:
    "Catch block only logs the error without rethrowing or handling it.",
  detect: createConsoleOnlyErrorRule(
    "Catch block only logs the error. Consider rethrowing or returning an error.",
  ),
};
