import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    parser: await import("@typescript-eslint/parser"),
  },
});

ruleTester.run("no-missing-return-types", testRules.noMissingReturnTypes, {
  valid: [
    {
      code: `
        function sum(a: number, b: number): number {
          return a + b;
        }
      `,
    },
    {
      code: `
        const multiply = (a: number, b: number): number => {
          return a * b;
        };
      `,
    },
  ],
  invalid: [
    {
      code: `
        function sum(a, b) {
          return a + b;
        }
      `,
      errors: [
        {
          messageId: "missing-return-type",
        },
      ],
    },
    {
      code: `
        function getData() {
          return fetchData();
        }
      `,
      errors: [
        {
          messageId: "missing-return-type",
        },
      ],
    },
  ],
});
