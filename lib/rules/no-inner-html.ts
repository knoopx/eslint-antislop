import type { AstRule } from "./types.js";
import { createTraversalDetect } from "./utils/createRule.js";

export const noInnerHtml: AstRule = {
  id: "no-inner-html",
  name: "No innerHTML",
  description:
    "innerHTML and dangerouslySetInnerHTML can introduce XSS vulnerabilities.",
  category: "security",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "no-inner-html",
  messageTemplate:
    "innerHTML/dangerouslySetInnerHTML is an XSS vector. Use textContent or a sanitizer.",
  detect: createTraversalDetect("*", (node) => {
    if (node.type === "AssignmentExpression") {
      if (
        node.left?.type === "MemberExpression" &&
        node.left.property?.type === "Identifier" &&
        node.left.property.name === "innerHTML"
      ) {
        return {
          line: node.loc.start.line,
          column: node.loc.start.column + 1,
          message: "innerHTML assignment detected - potential XSS vector",
          messageId: "no-inner-html",
        };
      }
    }

    if (node.type === "JSXAttribute" && node.name?.type === "JSXIdentifier") {
      if (node.name.name === "dangerouslySetInnerHTML") {
        return {
          line: node.loc.start.line,
          column: node.loc.start.column + 1,
          message: "dangerouslySetInnerHTML detected - potential XSS vector",
          messageId: "no-inner-html",
        };
      }
    }
    return;
  }),
};
