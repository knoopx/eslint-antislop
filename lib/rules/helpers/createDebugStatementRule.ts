import type { AstRule } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createTraversalDetect } from "../utils/createRule.js";
import { createFinding } from "../utils/typeGuards.js";

/**
 * Checks if a node is a method call on a specific object.
 */
function isMemberCallByName(
  node: TSESTree.Node,
  objectName: string,
  propertyName: string,
): boolean {
  return (
    node.type === "CallExpression" &&
    node.callee?.type === "MemberExpression" &&
    node.callee.object?.type === "Identifier" &&
    node.callee.object.name === objectName &&
    node.callee.property?.type === "Identifier" &&
    node.callee.property.name === propertyName
  );
}

/**
 * Creates a detect function for debug statements.
 */
export function createDebugStatementRule(
  message: string,
  options?: { messageId?: string },
): AstRule["detect"] {
  return createTraversalDetect("*", (node) => {
    if (node.type === "DebuggerStatement") {
      return [createFinding(node, message, 1, options)];
    }

    if (
      node.type === "ExpressionStatement" &&
      isMemberCallByName(node.expression, "console", "assert")
    ) {
      return [createFinding(node, message, 1, options)];
    }
    return [];
  });
}
