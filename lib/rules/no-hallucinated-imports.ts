import type { AstRule } from "./types.js";
import {
  createHallucinatedPackageRule,
  HALLUCINATED_JS_PACKAGES,
} from "./rule-helpers.js";

export const noHallucinatedImports: AstRule = {
  id: "no-hallucinated-imports",
  name: "No Hallucinated JS/TS Imports",
  description:
    "Detects imports of packages that are known AI hallucinations and don't exist on npm.",
  category: "hallucinated-imports",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  messageId: "hallucinated-import",
  messageTemplate:
    "Suspicious import: this package name looks hallucinated. Verify it exists on npm.",
  detect: createHallucinatedPackageRule(
    new Set(HALLUCINATED_JS_PACKAGES),
    "Potentially hallucinated import: '{package}'. Verify it exists on npm.",
  ),
};
