import type { AstRule } from "./types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createNodeTypeDetect } from "./utils/createRule.js";

export const noEmptyCatch: AstRule = {
  id: "no-empty-catch",
  name: "No Empty Catch Blocks",
  description: "Empty catch blocks silently swallow errors, hiding bugs.",
  category: "error-handling",
  severity: "error",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "empty-catch",
  messageTemplate: "Empty catch block swallows errors silently.",
  detect: createNodeTypeDetect(["CatchClause"], (node) => {
    const catchClause = node as { body?: TSESTree.Node };
    const body = catchClause.body;
    if (!body) return;
    if (body.type === "BlockStatement" && body.body.length === 0) {
      return {
        line: node.loc.start.line,
        column: node.loc.start.column + 1,
        message: "Empty catch block swallows errors silently.",
      };
    }

    if (body.type === "BlockStatement" && body.body.length === 1) {
      const singleStmt = body.body[0];
      if (
        singleStmt.type === "ExpressionStatement" &&
        singleStmt.expression?.type === "Literal" &&
        typeof singleStmt.expression.value === "string"
      ) {
        const exprStr = singleStmt.expression.value.toLowerCase();
        if (/^(todo|fixme|ignore|suppress|not implemented)/i.test(exprStr)) {
          return {
            line: node.loc.start.line,
            column: node.loc.start.column + 1,
            message:
              "Catch block only contains a placeholder - errors are still swallowed.",
          };
        }
      }
    }
    return;
  }),
};
