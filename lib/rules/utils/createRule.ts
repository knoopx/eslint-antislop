import tsVisitorKeys from "@typescript-eslint/visitor-keys";
import type { AstRule, AstFinding } from "../types.js";
import type { Rule as ESLintRule } from "eslint";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Gets visitor keys for a node type.
 */
function getVisitorKeys(nodeType: string): readonly string[] | undefined {
  return tsVisitorKeys.visitorKeys[nodeType];
}

/**
 * Checks if a node matches the selector pattern.
 */
function matchesSelector(nodeType: string, selectors: string[]): boolean {
  return selectors.includes("*") || selectors.includes(nodeType);
}

/**
 * Processes a child node during traversal.
 */
function processChildNode(
  child: unknown,
  selectors: string[],
  results: TSESTree.Node[],
): void {
  if (!child || typeof child !== "object") return;
  if (!('type' in child)) return;
  const childNode = child as TSESTree.Node;
  traverseNode(childNode, selectors, results);
}

/**
 * Processes child array during traversal.
 */
function processChildArray(
  children: unknown[],
  selectors: string[],
  results: TSESTree.Node[],
): void {
  for (const child of children) {
    processChildNode(child, selectors, results);
  }
}

/**
 * Recursively traverses AST nodes using TypeScript visitor keys.
 */
function traverseNode(
  node: TSESTree.Node,
  selectors: string[],
  results: TSESTree.Node[],
): void {
  const keys = getVisitorKeys(node.type);
  if (!keys) return;

  if (matchesSelector(node.type, selectors)) {
    results.push(node);
  }

  for (const key of keys) {
    const child = (node as unknown as Record<string, unknown>)[key];
    if (Array.isArray(child)) {
      processChildArray(child, selectors, results);
    } else if (child) {
      processChildNode(child, selectors, results);
    }
  }
}

/**
 * Custom ESQuery traverse function that uses TypeScript visitor keys
 */
function queryAST(ast: TSESTree.Program, selector: string): TSESTree.Node[] {
  const results: TSESTree.Node[] = [];
  const selectors = selector.split(",").map((s) => s.trim());
  traverseNode(ast, selectors, results);
  return results;
}

/**
 * Options for AST traversal-based detection
 */
interface TraversalDetectOptions {
  /** Selector to match nodes */
  selector?: string;
  /** Callback to check each node */
  checkNode: (
    node: TSESTree.Node,
    context: ESLintRule.RuleContext,
  ) => AstFinding | AstFinding[] | void;
}

/**
 * Creates a detect function that queries AST and checks nodes
 */
export function createTraversalDetect(
  selector: string,
  checkNode: (
    node: TSESTree.Node,
    context: ESLintRule.RuleContext,
  ) => AstFinding | AstFinding[] | void,
): AstRule["detect"] {
  return createTraversalDetectWithOptions({ selector, checkNode });
}

/**
 * Creates a detect function that checks for specific node types
 * @deprecated Use createTraversalDetect with explicit selector instead
 */
export function createNodeTypeDetect(
  nodeTypes: string[],
  checkNode: (
    node: TSESTree.Node,
    context: ESLintRule.RuleContext,
  ) => AstFinding | AstFinding[] | void,
): AstRule["detect"] {
  return createTraversalDetectWithOptions({
    selector: nodeTypes.join(", "),
    checkNode,
  });
}

/**
 * Shared implementation for AST traversal detection
 */
function createTraversalDetectWithOptions(
  options: TraversalDetectOptions,
): AstRule["detect"] {
  const { selector = "*", checkNode } = options;

  return function (context: ESLintRule.RuleContext): AstFinding[] {
    const findings: AstFinding[] = [];
    const ast = context.sourceCode.ast;

    // Use custom traversal with TypeScript visitor keys
    const nodes = queryAST(ast as TSESTree.Program, selector);

    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;

      const result = checkNode(node, context);
      if (result) {
        if (Array.isArray(result)) {
          findings.push(...result);
        } else {
          findings.push(result);
        }
      }
    }

    return findings;
  };
}

/**
 * Creates a detect function for import declarations
 */
export function createImportDetect(
  checkImport: (
    node: TSESTree.Node,
    context: ESLintRule.RuleContext,
  ) => AstFinding | AstFinding[] | void,
): AstRule["detect"] {
  return createTraversalDetect("ImportDeclaration", checkImport);
}

/**
 * Creates a detect function for call expressions
 */
export function createCallExpressionDetect(
  checkCall: (
    node: TSESTree.Node,
    context: ESLintRule.RuleContext,
  ) => AstFinding | AstFinding[] | void,
): AstRule["detect"] {
  return createTraversalDetect("CallExpression", checkCall);
}


export function createPatternMatchDetect(
  patterns: RegExp[],
  antiPatterns: RegExp[] | undefined,
  getFindings: (
    value: string,
    node: TSESTree.Node,
  ) => AstFinding | AstFinding[] | void,
): AstRule["detect"] {
  return createTraversalDetect("Literal", (node) => {
    const literalNode = node as TSESTree.Literal;
    if (typeof literalNode.value !== "string") return [];

    const value = literalNode.value;

    if (antiPatterns?.some((p) => p.test(value))) {
      return [];
    }

    // Check if value matches any pattern before generating findings
    if (!patterns.some((p) => p.test(value))) {
      return [];
    }

    const result = getFindings(value, node);
    if (result) {
      if (Array.isArray(result)) return result;
      return [result];
    }
    return [];
  });
}

/**
 * Options for createCommentPatternDetect
 */
interface CommentPatternDetectOptions {
  /** Base message to display */
  message: string;
  /** Whether to include the matched text in the message */
  includeText?: boolean;
  /** Patterns to match */
  patterns: RegExp[];
  /** Patterns to exclude */
  antiPatterns?: RegExp[];
}

/**
 * Creates a detect function for pattern matching in comments
 * Uses findCommentsMatching internally for consistency
 */
import { findCommentsMatching } from "./find-comments.js";

export function createCommentPatternDetect(
  options: CommentPatternDetectOptions,
): AstRule["detect"] {
  const { message, includeText = true, patterns, antiPatterns } = options;

  return (context: ESLintRule.RuleContext): AstFinding[] => {
    const comments = findCommentsMatching(
      context.sourceCode,
      patterns,
      antiPatterns,
    );
    return comments.map(({ line, column, text }) => ({
      line: line + 1,
      column: column + 1,
      message: includeText
        ? `${message} (found in: "${text}")`
        : message,
    }));
  };
}

/**
 * Creates a detect function for pattern matching in comments
 * Uses findCommentsMatching internally for consistency
 * @deprecated Use createCommentPatternDetect with options object instead
 */
export function createCommentPatternDetectOld(
  patterns: RegExp[],
  message: string,
  antiPatterns?: RegExp[],
): AstRule["detect"] {
  return createCommentPatternDetect({
    message,
    patterns,
    antiPatterns,
    includeText: true,
  });
}
