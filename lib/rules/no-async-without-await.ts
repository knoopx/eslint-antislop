import esquery from "esquery";
import type { Rule as ESLintRule } from "eslint";
import type { AstRule, AstFinding } from "./types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Node as ESTreeNode } from "estree";

export const noAsyncWithoutAwait: AstRule = {
  id: "no-async-without-await",
  name: "No Async Without Await",
  description:
    "Async functions that don't await anything. Either make them sync or await their promises.",
  category: "code-quality",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "no-async-without-await",
  messageTemplate:
    "Async function without await. Remove async or await the promise.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const ast = context.sourceCode.ast as TSESTree.Program;

    const asyncFuncSelectors = [
      "FunctionDeclaration[async=true]",
      "FunctionExpression[async=true]",
      "ArrowFunctionExpression[async=true]",
    ];

    function hasAwait(node: TSESTree.Node): boolean {
      const nodes = esquery(node as unknown as ESTreeNode, "AwaitExpression") as TSESTree.Node[];
      return nodes.length > 0;
    }

    const asyncFuncs = esquery(ast as unknown as ESTreeNode, asyncFuncSelectors.join(", ")) as (TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression)[] || [];

    for (const func of asyncFuncs) {
      let funcName: string;
      if (func.id && func.id.type === "Identifier") {
        funcName = func.id.name;
      } else {
        funcName = "anonymous";
      }

      if (!hasAwait(func as TSESTree.Node)) {
        findings.push({
          line: func.loc?.start.line || 0,
          column: (func.loc?.start.column || 0) + 1,
          message: `Async function '${funcName}' has no await. Remove async or await the promise.`,
        });
      }
    }

    return findings;
  },
};
