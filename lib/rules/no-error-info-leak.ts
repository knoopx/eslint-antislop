import type { AstRule } from "./types.js";
import { createErrorInfoLeakRule } from "./rule-helpers.js";

export const noErrorInfoLeak: AstRule = {
  id: "no-error-info-leak",
  name: "No Error Info Leak",
  description:
    "Sending error.message or error.stack to clients leaks internal details.",
  category: "framework",
  severity: "error",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "error-info-leak",
  messageTemplate:
    "Error internals leaked to HTTP response. Return a generic error message instead.",
  detect: createErrorInfoLeakRule(
    "Error internals may be leaked to HTTP response",
  ),
};
