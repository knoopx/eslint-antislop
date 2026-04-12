/**
 * Wrapper to convert AST-based rules to traditional ESLint rule format
 * for compatibility with RuleTester
 */

import type { AstRule, AstFinding } from "./rules/types.js";

export function wrapRule(rule: AstRule): import("eslint").Rule.RuleModule {
  const messageId = rule.messageId ?? rule.id;
  return {
    meta: {
      type: "problem",
      docs: {
        description: rule.description,
        url: undefined,
      },
      fixable: undefined,
      schema: [],
      messages: {
        [messageId]: rule.messageTemplate,
      },
    },
    create(
      context: import("eslint").Rule.RuleContext,
    ): import("eslint").Rule.RuleListener {
      const readonlyContext = context as Readonly<import("eslint").Rule.RuleContext>;
      return {
        Program() {
          const findings: AstFinding[] =
            rule.detect?.(readonlyContext) ?? [];

          for (const finding of findings) {
            context.report({
              loc: {
                line: finding.line,
                column: finding.column,
              },
              messageId,
            });
          }
        },
      };
    },
  } as import("eslint").Rule.RuleModule & {
    create: (context: Readonly<import("eslint").Rule.RuleContext>) => import("eslint").Rule.RuleListener;
  };
}
