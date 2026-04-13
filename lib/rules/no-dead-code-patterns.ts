import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
export const noDeadCodePatterns: AstRule = {
  id: "no-dead-code-patterns",
  name: "No Dead Code Patterns",
  description:
    "Commented-out code blocks that should be deleted. Dead code is not preserved - it is removed.",
  category: "codebase-health",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "no-dead-code-pattern",
  messageTemplate:
    "Commented-out code detected. Delete it - do not preserve dead code.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const sourceCode = context.sourceCode;
    const comments = sourceCode.getAllComments();

    const codePatterns = [
      /\b(?:const|let|var)\s+\w+\s*=/,
      /\bfunction\s+\w+\s*\([^)]*\)/,
      /\bclass\s+\w+(?:\s+extends\s+\w+)?/,
      /\bif\s*\([^)]*\)/,
      /\bfor\s*\([^)]*\)/,
      /\bwhile\s*\([^)]*\)/,
      /\bswitch\s*\([^)]*\)/,
      /\breturn\s+[^;]+;/,
      /\bimport\s+(?:[\{\w]|\*\s+from)/,
      /\bexport\s+(?:const|let|var|function|class|default|\{)/,
    ];

    const antiPatterns = [
      /eslint-disable/i,
      /@ts-\w+/i,
      /@(param|returns|typedef|type)/i,
      /\b(?:TODO|FIXME|XXX|HACK|NOTE|WARNING)\b/i,
      /\b(?:deprecated|obsolete)\b/i,
    ];

    for (const comment of comments) {
      const commentText = comment.value.trim();

      const isAntiPattern = antiPatterns.some((pattern) =>
        pattern.test(commentText),
      );
      if (isAntiPattern) continue;

      if (commentText.split(/\s+/).length <= 2) continue;

      const hasCodePattern = codePatterns.some((pattern) =>
        pattern.test(commentText),
      );

      if (hasCodePattern) {
        findings.push({
          line: comment.loc?.start.line || 0,
          column: comment.loc?.start.column || 0 + 1,
          message:
            "Commented-out code detected. Delete it - do not preserve dead code.",
        });
      }
    }

    return findings;
  },
};
