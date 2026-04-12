import type { AstRule } from "./types.js";
import { createDebugStatementRule } from "./rule-helpers.js";

export const noDebugAssertions: AstRule = {
  id: "no-debug-assertions",
  name: "No Debug Assertions",
  description: "debugger statements and console.assert left in code.",
  category: "codebase-health",
  severity: "error",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "debug-statement",
  messageTemplate: "Debug statement detected. Remove it before shipping.",
  detect: createDebugStatementRule("Debug statement detected. Remove it."),
};
