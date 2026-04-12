import type { AstRule } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import { findCommentsMatching } from "./utils.js";

export const noNoopPatterns: AstRule = {
  id: "no-noop-patterns",
  name: "No No-op Patterns",
  description:
    "No-op code that does nothing. Empty implementations are incomplete work.",
  category: "technical-debt",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "noop-pattern",
  messageTemplate:
    "No-op pattern detected. Implement the logic or remove the stub.",
  detect(
    context: ESLintRule.RuleContext,
  ): Array<{ line: number; column: number; message: string }> {
    const patterns = [
      /noop/i,
      /no-op/i,
      /no[_\s]?operation/i,
      /do[_\s]?nothing/i,
      /empty[_\s]?(?:body|function|handler)/i,
      /stubs?\s*\{\s*\}/i,
    ];

    const antiPatterns = [
      /eslint-disable/i,
      /intentionally/i,
      /abstract/i,
      /interface/i,
      /test/i,
      /mock/i,
    ];

    return findCommentsMatching(context.sourceCode, patterns, antiPatterns).map(
      (f) => ({
        line: f.line,
        column: f.column,
        message: "No-op pattern found",
      }),
    );
  },
};
