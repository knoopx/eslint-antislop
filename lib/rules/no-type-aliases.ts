import type { AstRule } from "./types.js";
import type { Rule as ESLintRule } from "eslint";
import type { TSESTree } from "@typescript-eslint/utils";

export const noTypeAliases: AstRule = {
  id: "no-type-aliases",
  name: "No Type Aliases",
  description:
    "Type aliases add indirection without value. Use the original type directly instead of creating an alias.",
  category: "simplicity",
  severity: "warn",
  languages: ["ts", "tsx"],
  messageId: "type-alias",
  messageTemplate:
    "Type alias detected. Use the original type directly instead of creating an alias.",
  detect(context: ESLintRule.RuleContext) {
    const findings: Array<{
      line: number;
      column: number;
      message: string;
    }> = [];
    const sourceCode = context.sourceCode;

    for (const node of sourceCode.ast.body) {
      const bodyNode = node as unknown as TSESTree.TSTypeAliasDeclaration;
      if (
        bodyNode.type === "TSTypeAliasDeclaration" &&
        bodyNode.loc &&
        bodyNode.id
      ) {
        findings.push({
          line: bodyNode.loc.start.line,
          column: bodyNode.loc.start.column + 1,
          message: `Type alias '${bodyNode.id.name}' detected. Use the original type directly.`,
        });
      }
    }

    return findings;
  },
};
