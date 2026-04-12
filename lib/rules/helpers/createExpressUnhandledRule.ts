import type { AstRule } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createCallExpressionDetect } from "../utils/createRule.js";
import { createFinding, isMemberCallExpression } from "../utils/typeGuards.js";

const EXPRESS_ROUTE_METHODS = new Set([
  "get",
  "post",
  "put",
  "delete",
  "patch",
]);

/**
 * Checks if a handler is async and lacks try-catch.
 */
function needsTryCatch(handler: TSESTree.Node): boolean {
  if (!isAsyncHandler(handler)) return false;
  return !hasTryCatchInHandler((handler as { body?: TSESTree.Node }).body);
}

/**
 * Checks if a node is an async handler.
 */
function isAsyncHandler(handler: TSESTree.Node): boolean {
  return (
    ((handler as { async?: boolean }).async ?? false) &&
    (handler.type === "ArrowFunctionExpression" ||
      handler.type === "FunctionExpression")
  );
}

/**
 * Checks if a handler body contains try-catch.
 */
function hasTryCatchInHandler(body: TSESTree.Node | undefined | null): boolean {
  if (!body) return false;
  if (body.type === "TryStatement") return true;
  if (body.type === "BlockStatement") {
    for (const stmt of body.body || []) {
      if (stmt.type === "TryStatement") return true;
    }
  }
  return false;
}

/**
 * Creates a detect function for unhandled async Express routes.
 */
export function createExpressUnhandledRule(message: string): AstRule["detect"] {
  return createCallExpressionDetect((node) => {
    if (!isMemberCallExpression(node)) return [];
    if (!EXPRESS_ROUTE_METHODS.has(node.callee.property.name)) return [];

    const args = node.arguments || [];
    for (let i = 1; i < args.length; i++) {
      if (needsTryCatch(args[i])) {
        return [createFinding(node, message)];
      }
    }
    return [];
  });
}
