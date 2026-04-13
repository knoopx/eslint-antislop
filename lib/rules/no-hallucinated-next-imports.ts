import type { AstRule } from "./types.js";
import {
  createHallucinatedImportRule,
  NEXT_PAGE_EXPORTS,
} from "./rule-helpers.js";

export const noHallucinatedNextImports: AstRule = {
  id: "no-hallucinated-next-imports",
  name: "No Hallucinated Next.js Imports",
  description:
    "Next.js APIs imported from 'react' when they should be page-level exports.",
  category: "hallucinated-imports",
  severity: "error",
  languages: ["js", "ts", "jsx", "tsx"],
  messageId: "no-hallucinated-next-import",
  messageTemplate: "{api} is a Next.js page export, not a React import.",
  detect: createHallucinatedImportRule(
    "react",
    NEXT_PAGE_EXPORTS,
    "{api} is a Next.js page export, not a React import.",
  ),
};
