import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
export const noAssumptionComments: AstRule = {
  id: "no-assumption-comments",
  name: "No Assumption Comments",
  description: "AI making unverified assumptions.",
  category: "noise",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  messageTemplate:
    "AI making unverified assumptions - dangerous in production.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const sourceCode = context.sourceCode;
    const comments = sourceCode.getAllComments();

    const assumptionPattern =
      /\b(assuming|assumes?|presumably|apparently|it seems|seems like)\b.{0,50}\b(that|this|the|it)\b/i;

    for (const comment of comments) {
      const text = comment.value;

      if (assumptionPattern.test(text)) {
        findings.push({
          line: comment.loc?.start.line || 0,
          column: comment.loc?.start.column || 0 + 1,
          message: "Assumption comment detected",
        });
      }
    }

    return findings;
  },
};
