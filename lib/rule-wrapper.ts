/**
 * Wrapper to convert AST-based rules to traditional ESLint rule format
 * for compatibility with RuleTester.
 */

import type { AstRule, DynamicAstRule } from "./rules/types.js";

type AnyAstRule = AstRule | DynamicAstRule;

export function wrapRule(rule: AnyAstRule): import("eslint").Rule.RuleModule {
  const hasTemplate = "messageTemplate" in rule;
  const messageId = hasTemplate
    ? ((rule as AstRule).messageId ?? "default")
    : "dynamic";

  return {
    meta: {
      type: "problem",
      docs: {
        description: rule.description,
        url: undefined,
      },
      fixable: "code" as const,
      schema: [],
      messages: hasTemplate
        ? { [messageId]: (rule as AstRule).messageTemplate }
        : {},
    },
    create(
      context: import("eslint").Rule.RuleContext,
    ): import("eslint").Rule.RuleListener {
      const readonlyContext = context as Readonly<
        import("eslint").Rule.RuleContext
      >;
      return {
        Program() {
          const findings = rule.detect?.(readonlyContext) ?? [];

          for (const finding of findings as unknown as Array<{
            line: number;
            column: number;
            message: string;
            messageId?: string;
            fix?: (
              fixer: import("eslint").Rule.RuleFixer,
            ) =>
              | import("eslint").Rule.Fix
              | Iterable<import("eslint").Rule.Fix>
              | null;
          }>) {
            if (hasTemplate) {
              const effectiveMessageId = finding.messageId ?? rule.messageId;

              if (effectiveMessageId) {
                context.report({
                  loc: { line: finding.line, column: finding.column },
                  messageId: effectiveMessageId,
                  fix: finding.fix,
                });
              } else {
                context.report({
                  loc: { line: finding.line, column: finding.column },
                  message: finding.message,
                  fix: finding.fix,
                });
              }
            } else {
              context.report({
                loc: { line: finding.line, column: finding.column },
                message: finding.message,
                fix: finding.fix,
              });
            }
          }
        },
      };
    },
  } as import("eslint").Rule.RuleModule & {
    create: (
      context: Readonly<import("eslint").Rule.RuleContext>,
    ) => import("eslint").Rule.RuleListener;
  };
}
