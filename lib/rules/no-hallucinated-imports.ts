import type { DynamicAstRule } from "./types.js";
import {
  createHallucinatedPackageRule,
  HALLUCINATED_JS_PACKAGES,
} from "./rule-helpers.js";

export const noHallucinatedImports: DynamicAstRule = {
  id: "no-hallucinated-imports",
  name: "No Hallucinated JS/TS Imports",
  description:
    "Detects imports of packages that are known AI hallucinations and don't exist on npm.",
  category: "hallucinated-imports",
  severity: "warn",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs"],
  detect: createHallucinatedPackageRule(
    new Set(HALLUCINATED_JS_PACKAGES),
    "Potentially hallucinated import: '{package}'. Verify it exists on npm.",
  ),
};
