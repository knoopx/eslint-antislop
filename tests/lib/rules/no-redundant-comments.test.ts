import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-redundant-comments", testRules.noRedundantComments, {
  valid: [
    {
      code: `
        // Redundant comment
        const x = x;
      `,
    },
    {
      code: `
        // Just assigning a value
        const count = 0;
      `,
    },
    {
      code: `
        // Initializing the variable
        let value = undefined;
      `,
    },
  ],
  invalid: [],
});
