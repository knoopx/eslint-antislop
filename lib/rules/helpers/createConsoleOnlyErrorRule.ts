import type { AstRule } from "../types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createNodeTypeDetect } from "../utils/createRule.js";
import { createFinding } from "../utils/typeGuards.js";

const DEFAULT_CONSOLE_METHODS = new Set(["log", "error", "warn", "info"]);

/**
 * Checks if a statement should be excluded (throw/return).
 */
function shouldExcludeStatement(stmt: TSESTree.Node): boolean {
  return stmt.type === "ThrowStatement" || stmt.type === "ReturnStatement";
}

/**
 * Analyzes catch clause body for console-only error handling.
 */
function analyzeCatchBody(
  body: { body: TSESTree.Node[] },
  defaultMethods: Set<string> = DEFAULT_CONSOLE_METHODS,
): { hasConsole: boolean; onlyConsole: boolean } | null {
  if (body.body.length === 0) return null;

  let hasConsole = false;
  let onlyConsole = true;

  for (const stmt of body.body) {
    if (stmt.type === "ExpressionStatement") {
      const expr = stmt.expression;
      if (
        expr.type === "CallExpression" &&
        expr.callee?.type === "MemberExpression" &&
        expr.callee.object?.type === "Identifier" &&
        expr.callee.object.name === "console" &&
        expr.callee.property?.type === "Identifier" &&
        defaultMethods.has(expr.callee.property.name)
      ) {
        hasConsole = true;
      } else {
        onlyConsole = false;
      }
    } else if (shouldExcludeStatement(stmt)) {
      onlyConsole = false;
    } else {
      onlyConsole = false;
    }
  }

  return { hasConsole, onlyConsole };
}

/**
 * Creates a detect function for console-only error handling.
 */
export function createConsoleOnlyErrorRule(
  message: string,
  options?: { messageId?: string },
): AstRule["detect"] {
  return createNodeTypeDetect(["CatchClause"], (node) => {
    const catchClause = node as TSESTree.CatchClause;
    const body = catchClause.body;
    if (!body || body.type !== "BlockStatement") return [];

    const analysis = analyzeCatchBody(body);
    if (analysis?.hasConsole && analysis.onlyConsole) {
      return [createFinding(node, message, 1, options)];
    }
    return [];
  });
}
