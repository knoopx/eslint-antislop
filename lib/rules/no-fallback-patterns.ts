import type { AstRule } from "./types.js";
import { createCommentPatternDetect } from "./utils/createRule.js";

const FALLBACK_PATTERNS = [
  /fallback/i,
  /degrade/i,
  /graceful[_\s]?degradation/i,
  /fallback[_\s]?(?:to|for)/i,
  /backup[_\s]?(?:method|plan|solution|implementation|value)/i,
];

const ANTI_PATTERNS = [/eslint-disable/i, /noqa/i];

export const noFallbackPatterns: AstRule = {
  id: "no-fallback-patterns",
  name: "No Fallback Patterns",
  description:
    "Fallback code indicates incomplete implementation. Missing data should crash, not use fallbacks.",
  category: "technical-debt",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "fallback-pattern",
  messageTemplate:
    "Fallback pattern detected. Either implement properly or handle the error explicitly.",
  detect: createCommentPatternDetect({
    patterns: FALLBACK_PATTERNS,
    antiPatterns: ANTI_PATTERNS,
    message: "Fallback pattern found",
    includeText: false,
  }),
};
