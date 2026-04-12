import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";
import { sharedHallucinatedImports } from "../../test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-hallucinated-imports", testRules.noHallucinatedImports, {
  valid: sharedHallucinatedImports.valid,
  invalid: sharedHallucinatedImports.invalid,
});
