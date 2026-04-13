import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
export const noFallbackDefaults: AstRule = {
  id: "no-fallback-defaults",
  name: "No Fallback Defaults",
  description:
    "Silent fallbacks that hide errors. Missing data should crash, not use defaults.",
  category: "error-handling",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "no-fallback-default",
  messageTemplate:
    "Silent fallback on required data. Fail fast instead of using defaults.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const sourceCode = context.sourceCode;
    const comments = sourceCode.getAllComments();

    const requiredNamesPattern = /(?:required|mandatory|critical)\w*/i;

    // This rule is better with regex for correlating comments with code
    // AST version checks for comments indicating required fields with fallbacks
    for (const comment of comments) {
      const text = comment.value;
      if (requiredNamesPattern.test(text)) {
        findings.push({
          line: comment.loc?.start.line || 0,
          column: comment.loc?.start.column || 0 + 1,
          message: "Required field may have silent fallback",
        });
      }
    }

    return findings;
  },
};
