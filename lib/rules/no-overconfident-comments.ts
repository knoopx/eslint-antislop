import type { DynamicAstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
export const noOverconfidentComments: DynamicAstRule = {
  id: "no-overconfident-comments",
  name: "No Overconfident Comments",
  description: "Overconfident comments indicating false certainty.",
  category: "noise",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
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
          message: `Delete overconfident comment using: '${overconfidentPattern.exec(text)?.[0]}'. Remove words like "obviously", "clearly", "simply", "definitely", "just", "of course". These create false certainty. Comments should be accurate and maintainable. Delete AI-generated absolute claims.`,
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
