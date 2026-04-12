import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import { findCommentsMatching } from "./utils.js";

export const noHedgingComments: AstRule = {
  id: "no-hedging-comments",
  name: "No Hedging Comments",
  description:
    'AI writes uncertain comments like "should work" or "might not be the best approach".',
  category: "ai-tell",
  severity: "info",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  messageId: "hedging-comment",
  messageTemplate:
    "Hedging comment detected. Either fix the uncertainty or remove the comment.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const hedgingPatterns = [
      /should\s+work/i,
      /might\s+not/i,
      /hopefully/i,
      /not\s+sure\s+if/i,
      /probably\s+(?:not\s+|isn'?t\s+)?(?:the\s+)?(?:best|right|correct)/i,
      /replace\s+this\s+with\s+your\s+actual/i,
      /this\s+(?:may|might|could)\s+(?:need|require)/i,
      /i\'?m\s+not\s+(?:sure|certain)/i,
    ];

    const antiPatterns = [/eslint-disable/i, /@ts-\w+/i, /noqa/i];

    return findCommentsMatching(
      context.sourceCode,
      hedgingPatterns,
      antiPatterns,
    ).map((m) => ({
      line: m.line,
      column: m.column + 1,
      message: `Hedging comment detected: "${m.text}"`,
    }));
  },
};
