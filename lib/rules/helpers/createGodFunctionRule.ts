import type { AstRule } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createNodeTypeDetect } from "../utils/createRule.js";

const FUNCTION_TYPES = [
  "FunctionDeclaration",
  "FunctionExpression",
  "ArrowFunctionExpression",
];

/**
 * Extracts the function name from a node.
 */
function getFunctionName(node: TSESTree.Node): string {
  if (node.type === "FunctionDeclaration" && node.id?.name) {
    return node.id.name;
  }
  if (node.type === "FunctionExpression" && node.id?.name) {
    return node.id.name;
  }
  return "anonymous";
}

/**
 * Calculates the function length in lines.
 */
function getFunctionLength(node: TSESTree.Node): number {
  const startLine = node.loc?.start?.line || 0;
  const endLine = node.loc?.end?.line || 0;
  return endLine - startLine + 1;
}

/**
 * Creates a finding for a god function.
 */
function createFinding(
  node: TSESTree.Node,
  funcName: string,
  funcLength: number,
  maxLines: number,
  messageTemplate: string,
): { line: number; column: number; message: string } {
  const message = messageTemplate
    .replace("{name}", funcName)
    .replace("{lines}", funcLength.toString())
    .replace("{max}", maxLines.toString());

  return {
    line: node.loc?.start?.line || 0,
    column: (node.loc?.start?.column || 0) + 1,
    message,
  };
}

/**
 * Creates a detect function for god functions (too many lines).
 */
export function createGodFunctionRule(
  maxLines: number,
  messageTemplate: string,
): AstRule["detect"] {
  return createNodeTypeDetect(FUNCTION_TYPES, (node) => {
    const funcName = getFunctionName(node);
    const funcLength = getFunctionLength(node);

    if (funcLength > maxLines) {
      return createFinding(node, funcName, funcLength, maxLines, messageTemplate);
    }
    return [];
  });
}
