import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";
import { createNarratorTestCases } from "../../../lib/rules/test-helpers.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

const valid = [
  {
    code: `
      function calculateTotal(items) {
        const total = items.reduce((sum, item) => sum + item.price, 0);
        return total;
      }
    `,
  },
  {
    code: `
      async function fetchData(url) {
        const response = await fetch(url);
        return response.json();
      }
    `,
  },
  {
    code: `
      class Calculator {
        add(a, b) {
          return a + b;
        }
      }
    `,
  },
];

const invalid = createNarratorTestCases("Narrator comment detected.", "narrator-comment");

ruleTester.run("no-narrator-comments", testRules.noNarratorComments, {
  valid,
  invalid,
});
