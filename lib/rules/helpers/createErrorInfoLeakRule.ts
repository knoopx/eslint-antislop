import type { AstRule } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createCallExpressionDetect } from "../utils/createRule.js";
import { createFinding, isMemberCallExpression } from "../utils/typeGuards.js";

const ERROR_LEAK_PROPERTIES = new Set(["message", "stack", "toString"]);
const RESPONSE_METHODS = new Set(["json", "send"]);

/**
 * Checks if a node has a property that leaks error information.
 */
function hasLeakingProperty(arg: TSESTree.Node): boolean {
  return (
    arg.type === "MemberExpression" &&
    arg.property?.type === "Identifier" &&
    ERROR_LEAK_PROPERTIES.has(arg.property.name)
  );
}

/**
 * Creates a detect function for error info leaks in HTTP responses.
 */
export function createErrorInfoLeakRule(message: string): AstRule["detect"] {
  return createCallExpressionDetect((node) => {
    if (!isMemberCallExpression(node)) return [];
    if (!RESPONSE_METHODS.has(node.callee.property.name)) return [];

    for (const arg of node.arguments || []) {
      if (hasLeakingProperty(arg)) {
        return [createFinding(node, message)];
      }
    }
    return [];
  });
}
