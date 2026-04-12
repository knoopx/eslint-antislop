import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import { findCommentsMatching } from "./utils.js";

export const noSectionDividers: AstRule = {
  id: "no-section-dividers",
  name: "No Section Divider Comments",
  description:
    'AI generates ASCII section dividers like "// ========" that clutter code.',
  category: "ai-tell",
  severity: "info",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  messageId: "section-divider",
  messageTemplate: "ASCII section divider comment",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const dividerPattern = /^[-=*~]{3,}$/;
    const antiPatterns = [/eslint-disable/i, /noqa/i, /license/i, /copyright/i];

    return findCommentsMatching(
      context.sourceCode,
      [dividerPattern],
      antiPatterns,
    ).map((m) => ({
      line: m.line,
      column: m.column + 1,
      message: "ASCII section divider comment",
    }));
  },
};
