import type { AstRule } from "./types.js";
import { createTraversalDetect } from "./utils/createRule.js";

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
  detect: createTraversalDetect("Literal", (node) => {
    // Only check string literals
    if (node.type !== "Literal" || typeof node.value !== "string") {
      return;
    }

    // Skip if not a magic CSS value
    if (!isMagicCssValue(node.value)) {
      return;
    }

    return {
      line: node.loc?.start.line || 0,
      column: node.loc?.start.column || 0,
      message: "Magic CSS value - extract to design token or const.",
    };
  }),
};
