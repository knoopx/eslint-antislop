import type { DynamicAstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import { findCommentsMatching } from "./utils.js";

export const noHedgingComments: DynamicAstRule = {
  id: "no-hedging-comments",
  name: "No Hedging Comments",
  description:
    'AI writes uncertain comments like "should work" or "might not be the best approach".',
  category: "ai-tell",
  severity: "info",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
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
      message: `Delete uncertain hedging comment: "${m.text}". Remove hedging phrases like "should work", "might not", "hopefully", "not sure if". If code has uncertainty, fix the code or add a TODO with a concrete issue reference. Remove AI-generated uncertainty markers.`,
      fix(fixer) {
        const text = context.sourceCode.getText();
        const lineStart = text.lastIndexOf("\n", m.rangeStart - 1) + 1;
        const lineEnd = text.indexOf("\n", m.rangeEnd);
        const end = lineEnd === -1 ? text.length : lineEnd + 1;
        return fixer.removeRange([lineStart, end]);
      },
    }));
  },
};
