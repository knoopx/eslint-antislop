import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
export const noEslintDisable: AstRule = {
  id: "no-eslint-disable",
  name: "No eslint-disable Comments",
  description:
    "Broad `eslint-disable` comments hide issues. Use `eslint-disable-next-line` with justification instead.",
  category: "linting",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "eslint-disable",
  messageTemplate:
    "eslint-disable comments hide issues. Fix the code or use `eslint-disable-next-line` with justification.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const sourceCode = context.sourceCode;
    const comments = sourceCode.getAllComments();

    const nextLinePattern = /eslint-disable-next-line/i;
    const disablePattern = /^(eslint-?disable-?)/i;

    for (const comment of comments) {
      const text = comment.value.trim();

      if (nextLinePattern.test(text)) continue;

      if (disablePattern.test(text)) {
        findings.push({
          line: comment.loc?.start.line || 0,
          column: comment.loc?.start.column || 0,
          message: "eslint-disable comment detected",
        });
      }
    }

    return findings;
  },
};
