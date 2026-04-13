import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-type-aliases", testRules.noTypeAliases, {
  valid: [
    {
      code: `
        interface UserId {
          value: string;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        type UserId = string;
      `,
      errors: [{ messageId: "no-type-alias" }],
    },
    {
      code: `
        type Config = string;
      `,
      errors: [{ messageId: "no-type-alias" }],
    },
    {
      code: `
        type UserId = string;
        type UserName = string;
        type UserEmail = string;
      `,
      errors: [
        { messageId: "no-type-alias" },
        { messageId: "no-type-alias" },
        { messageId: "no-type-alias" },
      ],
    },
  ],
});
