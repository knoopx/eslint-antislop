import type { TSESTree } from "@typescript-eslint/utils";

export interface FindingOptions {
  messageId?: string;
}

/**
 * Creates a finding with optional column offset and metadata.
 */
export function createFinding(
  node: { loc: { start: { line: number; column: number } } },
  message: string,
  columnOffset?: number,
  options?: FindingOptions,
): {
  line: number;
  column: number;
  message: string;
  messageId?: string;
} {
  return {
    line: node.loc.start.line,
    column: node.loc.start.column + (columnOffset ?? 1),
    message,
    messageId: options?.messageId,
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
