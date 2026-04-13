import type { Rule as ESLintRule } from "eslint";
import type { AstRule, AstFinding } from "./types.js";
import type { TSESTree } from "@typescript-eslint/utils";

function isExportNode(node: TSESTree.Node): boolean {
  if (node.type === "ExportAllDeclaration") {
    return true;
  }
  if (node.type === "ExportNamedDeclaration" && node.source) {
    return true;
  }
  return false;
}

function hasOnlyReexports(astBody: TSESTree.Node[]): {
  onlyReexports: boolean;
  exportNodes: TSESTree.Node[];
} {
  const exportNodes: TSESTree.Node[] = [];

  for (const node of astBody) {
    if (isExportNode(node)) {
      exportNodes.push(node);
    } else {
      return { onlyReexports: false, exportNodes: [] };
    }
  }

  return { onlyReexports: true, exportNodes };
}

/**
 * Generate findings for re-export statements
 */
function generateFindings(exportNodes: TSESTree.Node[]): AstFinding[] {
  const findings: AstFinding[] = [];

  for (const node of exportNodes) {
    if (!node.loc) {
      continue;
    }
    findings.push({
      line: node.loc.start.line,
      column: node.loc.start.column + 1,
      message:
        "Re-export shim adds indirection. Import directly from the source module.",
      messageId: "no-reexport-shim",
    });
  }

  return findings;
}

export const noReexportShims: AstRule = {
  id: "no-reexport-shims",
  name: "No Re-export Shims",
  description:
    "Files that only re-export from another module add indirection without value.",
  category: "simplicity",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "no-reexport-shim",
  messageTemplate:
    "Re-export shim adds indirection. Import directly from the source module.",
  detect(context: ESLintRule.RuleContext): AstFinding[] {
    const sourceCode = context.sourceCode;
    const filename = context.filename || "";

    // Allow index.ts and index.js files which are commonly re-export entry points
    // (not index.tsx or index.jsx which are typically component files)
    if (/^index\.(ts|js)$/.test(filename)) {
      return [];
    }

    const ast = sourceCode.ast as unknown as { body: TSESTree.Node[] };
    if (!ast.body || ast.body.length === 0) {
      return [];
    }

    const { onlyReexports, exportNodes } = hasOnlyReexports(ast.body);

    if (onlyReexports && exportNodes.length > 0) {
      return generateFindings(exportNodes);
    }

    return [];
  },
};
