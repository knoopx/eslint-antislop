import type { AstRule } from "./types.js";
import { createGodFunctionRule } from "./rule-helpers.js";

export const noGodFunction: AstRule = {
  id: "no-god-function",
  name: "No God Functions",
  description:
    "Functions over 80 lines are hard to test, debug, and maintain. AI generates these frequently.",
  category: "code-quality",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "no-too-many-lines",
  messageTemplate:
    "Function exceeds 80 lines. Break it into smaller functions.",
  detect: createGodFunctionRule(
    80,
    "Function '{name}' is {lines} lines (max: {max}). Consider splitting it.",
  ),
};
