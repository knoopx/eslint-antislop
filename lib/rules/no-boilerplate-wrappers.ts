import esquery from "esquery";
import type { AstRule, AstFinding } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Checks if an expression is a simple arrow function with a single return statement
 * that calls another function with no transformation.
 */
function isBoilerplateWrapper(
  node: TSESTree.VariableDeclarator | null | undefined,
): { isBoilerplate: true; wrapperName: string; calledName: string } | { isBoilerplate: false } {
  if (!node?.init) return { isBoilerplate: false };

  if (node.init.type !== "ArrowFunctionExpression") return { isBoilerplate: false };

  if (node.init.body?.type !== "BlockStatement") return { isBoilerplate: false };
  if (node.init.body.body.length !== 1) return { isBoilerplate: false };

  const stmt = node.init.body.body[0];

  if (stmt.type !== "ReturnStatement") return { isBoilerplate: false };

  if (stmt.argument?.type !== "CallExpression") return { isBoilerplate: false };

  if (stmt.argument.callee?.type !== "Identifier") return { isBoilerplate: false };

  if (node.id?.type !== "Identifier") return { isBoilerplate: false };

  const wrapperName = node.id.name;
  const calledName = stmt.argument.callee.name;

  if (wrapperName === calledName || node.init.params.length !== 0) {
    return { isBoilerplate: false };
  }

  return { isBoilerplate: true, wrapperName, calledName };
}

function createFindingMessage(wrapperName: string, calledName: string): string {
  return `Wrapper '${wrapperName}' just calls '${calledName}' with no transformation.`;
}

export const noBoilerplateWrappers: AstRule = {
  id: "no-boilerplate-wrappers",
  name: "No Boilerplate Wrappers",
  description:
    "Empty wrapper functions that only call one other function add indirection without value.",
  category: "simplicity",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "boilerplate-wrapper",
  messageTemplate:
    "Wrapper function adds indirection without transformation. Inline or remove it.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const nodes = esquery(
      context.sourceCode.ast,
      "VariableDeclarator",
    ) as TSESTree.VariableDeclarator[];

    for (const node of nodes) {
      const result = isBoilerplateWrapper(node);
      if (!result.isBoilerplate) continue;

      const message = createFindingMessage(result.wrapperName, result.calledName);

      findings.push({
        line: node.loc?.start.line || 0,
        column: (node.loc?.start.column || 0) + 1,
        message,
      });
    }

    return findings;
  },
};
