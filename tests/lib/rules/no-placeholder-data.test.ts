import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const valid = [
  {
    code: `
      function getUser() {
        return { name: actualName, email: actualEmail };
      }
    `,
  },
  {
    code: `
      const user = { id: 1, name: "Alice Johnson", email: "alice@example.com" };
    `,
  },
];

const ruleTester = createRuleTester();

ruleTester.run("no-placeholder-data", testRules.noPlaceholderData, {
  valid,
  invalid: [
    {
      code: `const data = { name: 'John Doe', email: 'test@example.com' };`,
      errors: [{ messageId: "no-placeholder-data" }],
    },
    {
      code: `const user = { id: 1, name: 'Dummy Name' };`,
      errors: [{ messageId: "no-placeholder-data" }],
    },
    {
      code: `const config = { api_key: 'xxx-xxx-xxx' };`,
      errors: [{ messageId: "no-placeholder-data" }],
    },
  ],
});
