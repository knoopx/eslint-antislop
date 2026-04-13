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
 * Checks if a node is inside a const declaration that should be considered
 * a CSS design token (either with 'as const' or simple constant).
 */
function isInsideValidCssConst(
  node: TSESTree.Node,
  context: import("eslint").Rule.RuleContext
): boolean {
  let currentNode: TSESTree.Node | null = node;

  // Walk up the parent chain
  while (currentNode) {
    const parent = currentNode.parent;
    if (!parent) break;

    // Check if parent is a VariableDeclarator with const
    if (parent.type === "VariableDeclarator") {
      const grandparent = parent.parent;
      if (grandparent?.type === "VariableDeclaration") {
        if (grandparent.kind === "const") {
          // Check if init uses 'as const' type assertion
          if (parent.init?.type === "TSAsExpression") {
            // 'as const' creates a TSAsExpression with typeAnnotation as TSTypeReference
            const typeAnnotation = parent.init.typeAnnotation;
            if (
              typeAnnotation?.type === "TSTypeReference" &&
              typeAnnotation.typeName.type === "Identifier" &&
              typeAnnotation.typeName.name === "const"
            ) {
              return true;
            }
          } else {
            // Simple const declaration without object/array: const A = "#rrggbb"
            // This is valid because there's no nested magic CSS
            if (parent.init?.type === "Literal") {
              return true;
            }
          }
        }
      }
    }

    currentNode = parent;
  }

  return false;
}

export const noMagicCss: AstRule = {
  id: "no-magic-css",
  name: "No Magic CSS Values",
  description:
    "Magic CSS values that should be extracted to design tokens.",
  category: "style",
  severity: "info",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "magic-css",
  messageTemplate:
    "Magic CSS value - extract to design token or const.",
  detect: createTraversalDetect("Literal", (node, context) => {
    // Only check string literals
    if (node.type !== "Literal" || typeof node.value !== "string") {
      return;
    }

    // Skip if not a magic CSS value
    if (!isMagicCssValue(node.value)) {
      return;
    }

    // Skip magic CSS values in valid CSS const declarations
    if (isInsideValidCssConst(node, context)) {
      return;
    }

    return {
      line: node.loc?.start.line || 0,
      column: node.loc?.start.column || 0,
      message: "Magic CSS value - extract to design token or const.",
    };
  }),
};
