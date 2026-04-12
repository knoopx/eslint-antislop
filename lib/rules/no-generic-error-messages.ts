import type { AstRule } from "./types.js";
import { createGenericErrorRule } from "./rule-helpers.js";

export const noGenericErrorMessages: AstRule = {
  id: "no-generic-error-messages",
  name: "No Generic Error Messages",
  description:
    "Generic error messages that don't help debugging. Error messages must be specific.",
  category: "error-handling",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "generic-error",
  messageTemplate:
    "Generic error message. Make it specific about what went wrong.",
  detect: createGenericErrorRule(
    'Generic error message: "{message}". Make it specific about what went wrong.',
  ),
};
