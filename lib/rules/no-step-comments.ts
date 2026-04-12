import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
export const noStepComments: AstRule = {
  id: "no-step-comments",
  name: "No Step-by-Step Comments",
  description:
    'AI generates numbered step comments like "Step 1: Initialize" that add noise.',
  category: "ai-tell",
  severity: "info",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  messageId: "step-comment",
  messageTemplate: "Numbered step comment. Let the code speak for itself.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const sourceCode = context.sourceCode;
    const comments = sourceCode.getAllComments();

    const stepPattern = /step\s+\d+\s*[:.-]/i;
    const antiPatterns = [/eslint-disable/i, /noqa/i];

    for (const comment of comments) {
      const text = comment.value;

      if (antiPatterns.some((p) => p.test(text))) continue;

      // Skip markdown files based on filename
      const filename = (context.sourceCode as unknown as { filename?: string }).filename || "";
      if (/\.md$/i.test(filename)) continue;

      if (stepPattern.test(text)) {
        findings.push({
          line: comment.loc?.start.line || 0,
          column: comment.loc?.start.column || 0 + 1,
          message: "Numbered step comment. Let the code speak for itself.",
        });
      }
    }

    return findings;
  },
};
