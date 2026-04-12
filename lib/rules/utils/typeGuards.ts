import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Creates a finding with optional column offset.
 */
export function createFinding(
  node: { loc: { start: { line: number; column: number } } },
  message: string,
  columnOffset: number = 1,
): { line: number; column: number; message: string } {
  return {
    line: node.loc.start.line,
    column: node.loc.start.column + columnOffset,
    message,
  };
}

/**
 * Type guard for a CallExpression on a MemberExpression with an Identifier property.
 */
export function isMemberCallExpression(
  node: TSESTree.Node,
): node is TSESTree.CallExpression & {
  callee: TSESTree.MemberExpression & {
    property: TSESTree.Identifier;
  };
} {
  return (
    node.type === "CallExpression" &&
    node.callee?.type === "MemberExpression" &&
    node.callee.property?.type === "Identifier"
  );
}
