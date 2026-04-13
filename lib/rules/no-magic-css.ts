import type { AstRule } from "./types.js";
import { createTraversalDetect } from "./utils/createRule.js";
import type { TSESTree } from "@typescript-eslint/utils";

function isMagicCssValue(value: string): boolean {
  if (/\d+px/.test(value)) {
    return true;
  }
  if (/^#[0-9a-fA-F]{3,8}$/.test(value)) {
    return true;
  }
  if (/^rgba?\(/.test(value)) {
    return true;
  }
  if (/^hsl\(/.test(value)) {
    return true;
  }
  return false;
}

/**
 * Check if a VariableDeclarator uses `as const` type assertion.
 */
function isAsConstDeclaration(
  declarator: TSESTree.VariableDeclarator,
): boolean {
  if (declarator.init?.type !== "TSAsExpression") return false;
  const typeAnnotation = declarator.init.typeAnnotation;
  if (typeAnnotation?.type !== "TSTypeReference") return false;
  const typeName = typeAnnotation.typeName;
  return typeName.type === "Identifier" && typeName.name === "const";
}

/**
 * Check if a VariableDeclarator is a simple literal const (e.g. `const A = "#rrggbb"`).
 */
function isSimpleLiteralConst(
  declarator: TSESTree.VariableDeclarator,
): boolean {
  return declarator.init?.type === "Literal";
}

/**
 * Check if a VariableDeclaration is declared with `const`.
 */
function isConstDeclaration(decl: TSESTree.Node): boolean {
  return decl.type === "VariableDeclaration" && decl.kind === "const";
}

/**
 * Checks if a node is inside a const declaration that should be considered
 * a CSS design token (either with 'as const' or simple constant).
 */
function isInsideValidCssConst(node: TSESTree.Node): boolean {
  let currentNode: TSESTree.Node | null = node;

  while (currentNode) {
    const parent: TSESTree.Node | null | undefined = currentNode.parent;
    if (!parent) break;

    if (
      parent.type === "VariableDeclarator" &&
      isConstDeclaration(parent.parent ?? {})
    ) {
      if (isAsConstDeclaration(parent) || isSimpleLiteralConst(parent)) {
        return true;
      }
    }

    currentNode = parent;
  }

  return false;
}

export const noMagicCss: AstRule = {
  id: "no-magic-css",
  name: "No Magic CSS Values",
  description: "Magic CSS values that should be extracted to design tokens.",
  category: "style",
  severity: "info",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "no-magic-css",
  messageTemplate: "Magic CSS value - extract to design token or const.",
  detect: createTraversalDetect("Literal", (node) => {
    // Only check string literals
    if (node.type !== "Literal" || typeof node.value !== "string") {
      return;
    }

    // Skip if not a magic CSS value
    if (!isMagicCssValue(node.value)) {
      return;
    }

    // Skip magic CSS values in valid CSS const declarations
    if (isInsideValidCssConst(node)) {
      return;
    }

    return {
      line: node.loc?.start.line || 0,
      column: node.loc?.start.column || 0,
      message: "Magic CSS value - extract to design token or const.",
      messageId: "no-magic-css",
    };
  }),
};
