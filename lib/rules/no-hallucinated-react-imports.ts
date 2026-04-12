import type { AstRule } from "./types.js";
import {
  createHallucinatedImportRule,
  HALLUCINATED_REACT_APIS,
} from "./rule-helpers.js";

export const noHallucinatedReactImports: AstRule = {
  id: "no-hallucinated-react-imports",
  name: "No Hallucinated React Imports",
  description:
    "React-specific APIs imported from 'react' when they don't exist there.",
  category: "hallucinated-imports",
  severity: "error",
  languages: ["js", "ts", "jsx", "tsx"],
  messageId: "hallucinated-react-import",
  messageTemplate:
    "{api} does not exist in 'react'. Import from the correct package.",
  detect: createHallucinatedImportRule(
    "react",
    HALLUCINATED_REACT_APIS,
    "{api} does not exist in 'react'. Import from the correct package.",
  ),
};
