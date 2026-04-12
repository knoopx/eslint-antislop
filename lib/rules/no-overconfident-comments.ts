import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
export const noOverconfidentComments: AstRule = {
  id: "no-overconfident-comments",
  name: "No Overconfident Comments",
  description: "Overconfident comments indicating false certainty.",
  category: "noise",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  messageId: "overconfident-comment",
  messageTemplate:
    "Overconfident comment - avoid false certainty claims.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const sourceCode = context.sourceCode;
    const comments = sourceCode.getAllComments();

    const overconfidentPattern =
      /\b(obviously|clearly|simply|just|easy|trivial|basically|literally|of course|naturally|certainly|surely|sure|must|definitely|obvious|definitive|obviously|undeniable)\b/i;

    for (const comment of comments) {
      const text = comment.value;

      if (overconfidentPattern.test(text)) {
        findings.push({
          line: comment.loc?.start.line || 0,
          column: comment.loc?.start.column || 0 + 1,
          message: "Overconfident comment detected",
        });
      }
    }

    return findings;
  },
};
