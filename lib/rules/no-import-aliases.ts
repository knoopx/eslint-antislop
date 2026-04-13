import type { DynamicAstRule } from "./types.js";
import type { TSESTree } from "@typescript-eslint/utils";
import { createImportDetect } from "./utils/createRule.js";

export const noImportAliases: DynamicAstRule = {
  id: "no-import-aliases",
  name: "No Import Aliases",
  description:
    "Import aliases (import { X as Y }) add indirection. Import with the original name or rename the source.",
  category: "simplicity",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  detect: createImportDetect((node) => {
    const importNode = node as { specifiers?: TSESTree.Node[] };
    const specifiers = importNode.specifiers || [];
    const findings = [];

    for (const specifier of specifiers) {
      if (
        specifier.type === "ImportSpecifier" &&
        specifier.imported?.type === "Identifier" &&
        specifier.imported.name !== specifier.local.name
      ) {
        findings.push({
          line: specifier.loc.start.line,
          column: specifier.loc.start.column + 1,
          message: `Import alias '${specifier.local.name}' for '${specifier.imported.name}'. Use the original name directly.`,
        });
      }
    }

    return findings.length > 0 ? findings : undefined;
  }),
};
