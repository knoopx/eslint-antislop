import { testRules } from "../../../lib/rules/test-utils.js";
import { createPlaceholderDataTestCases, createRuleTester } from "../../test-helpers.js";

const valid = [
  {
    code: `
      function getUser() {
        return db.find({ id: userId });
      }
    `,
  },
  {
    code: `
      const config = {
        apiUrl: process.env.API_URL
      };
    `,
  },
  {
    code: `
      function calculatePrice(items) {
        return items.reduce((sum, item) => sum + item.price, 0);
      }
    `,
  },
];

const invalid = createPlaceholderDataTestCases("Placeholder data detected. Replace with actual values.", "placeholder-data");

const ruleTester = createRuleTester();

ruleTester.run("no-placeholder-data", testRules.noPlaceholderData, {
  valid,
  invalid,
});
