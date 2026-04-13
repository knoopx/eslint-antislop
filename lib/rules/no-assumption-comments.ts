import type { DynamicAstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";

export const noAssumptionComments: DynamicAstRule = {
  id: "no-assumption-comments",
  name: "No Assumption Comments",
  description: "AI making unverified assumptions.",
  category: "noise",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
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
          message: `Delete assumption comment: "${text}". Remove unverified assumptions like "assuming this is valid", "it seems like", "apparently". Either add proper validation, error handling, or delete the assumption. AI assumptions are dangerous in production.`,
          fix(fixer) {
            const text = context.sourceCode.getText();
            const cs = comment.range![0];
            const lineStart = text.lastIndexOf("\n", cs - 1) + 1;
            const lineEnd = text.indexOf("\n", cs);
            const end = lineEnd === -1 ? text.length : lineEnd + 1;
            return fixer.removeRange([lineStart, end]);
          },
        });
      }
    }

    return findings;
  },
};
