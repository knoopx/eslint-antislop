import type { AstRule } from "./types.js";
import { createPatternMatchDetect } from "./utils/createRule.js";
import { createFinding } from "./utils/createFinding.js";

const PLACEHOLDER_PATTERNS = [
  /lorem\s*ipsum/i,
  /ipsum\s*dolor/i,
  /\btbd\b/i,
  /\bxxx\b/i,
  /\bplaceholder\b/i,
  /put\s+placeholder/i,
  /replace\s+this/i,
  /your[_\s]?(?:text|name)/i,
  /test@example\.com/i,
  /user@example\.com/i,
  /fake@example\.com/i,
  /dummy/i,
  /^John Doe$/i,
  /^Dummy Name$/i,
];

const ANTI_PATTERNS = [/eslint-disable/i, /test/i, /mock/i, /sample/i, /demo/i];

export const noPlaceholderData: AstRule = {
  id: "no-placeholder-data",
  name: "No Placeholder Data",
  description:
    "Placeholder strings like 'Lorem ipsum', 'TBD', 'XXX' that indicate incomplete work.",
  category: "code-quality",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "placeholder-data",
  messageTemplate:
    "Placeholder data detected. Replace with actual values or remove.",
  detect: createPatternMatchDetect(
    PLACEHOLDER_PATTERNS,
    ANTI_PATTERNS,
    (_value, node) => {
      return createFinding(node, "Placeholder data detected. Replace with actual values.");
    },
  ),
};
