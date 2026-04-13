import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import { findCommentsMatching } from "./utils.js";

export const noSectionDividers: AstRule = {
  id: "no-section-dividers",
  name: "No Section Divider Comments",
  description:
    "ASCII section divider comments break when code changes and signal a file has grown too large.",
  category: "ai-tell",
  severity: "info",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  messageId: "no-section-divider",
  messageTemplate: "Section divider comment",
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
      message:
        "Section divider comment. Split the divided sections into separate files for maintainability instead of grouping unrelated concerns in one file.",
      messageId: "no-section-divider",
    }));
  },
};
