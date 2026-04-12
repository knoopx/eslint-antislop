import type { ESLint, Rule } from "eslint";
import { RULE_REGISTRY } from "./rules/registry.js";
import * as Rules from "./rules/base.js";
import type { AstRule } from "./rules/types.js";

/**
 * Converts an AST-based rule to an ESLint rule definition
 */
function createRuleDefinition(rule: AstRule): Rule.RuleModule {
  return {
    meta: {
      type: "problem",
      docs: {
        description: rule.description,
      },
      schema: [],
      messages: {
        default: rule.messageTemplate,
      },
    },
    create(context: Rule.RuleContext) {
      const findings = rule.detect(context);
      if (findings) {
        for (const finding of findings) {
          context.report({
            loc: {
              line: finding.line,
              column: finding.column,
            },
            message: finding.message,
          });
        }
      }
      return {};
    },
  };
}

/**
 * Build rules object from registry
 */
function buildRulesObject(): Record<string, Rule.RuleModule> {
  const rules: Record<string, Rule.RuleModule> = {};
  for (const { id, name } of RULE_REGISTRY) {
    const rule = (Rules as Record<string, AstRule>)[name];
    if (rule) {
      rules[id] = createRuleDefinition(rule);
    }
  }
  return rules;
}

export const plugin = {
  meta: {
    name: "eslint-plugin-antislop",
    version: "1.0.0",
  },
  rules: buildRulesObject(),
} satisfies ESLint.Plugin;
