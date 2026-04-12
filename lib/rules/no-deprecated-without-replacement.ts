import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
export const noDeprecatedWithoutReplacement: AstRule = {
  id: "no-deprecated-without-replacement",
  name: "No Deprecated Without Replacement",
  description:
    "@deprecated labels without migration path. Labeling dead code deprecated is preservation, not removal.",
  category: "codebase-health",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "deprecated-no-replacement",
  messageTemplate:
    "@deprecated without replacement suggestion. Either provide migration path or delete the code.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const sourceCode = context.sourceCode;
    const comments = sourceCode.getAllComments();

    const deprecatedPattern = /@(?:deprecated|obsolete|removed)\b/i;
    const replacementKeywords = /\b(use|replace|replaced|migrate|instead)\b/i;

    for (const comment of comments) {
      const text = comment.value;
      if (deprecatedPattern.test(text) && !replacementKeywords.test(text)) {
        findings.push({
          line: comment.loc?.start.line || 0,
          column: comment.loc?.start.column || 0 + 1,
          message:
            "@deprecated without replacement suggestion. Either provide migration path or delete the code.",
        });
      }
    }

    return findings;
  },
};
