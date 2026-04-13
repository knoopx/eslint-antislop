import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-generic-error-messages", testRules.noGenericErrorMessages, {
  valid: [
    {
      code: `
        throw new Error("Failed to connect to database");
      `,
    },
  ],
  invalid: [
    {
      code: `
        throw new Error("error");
      `,
      errors: [{ messageId: "no-generic-error" }],
    },
    {
      code: `
        throw new Error("failed");
      `,
      errors: [{ messageId: "no-generic-error" }],
    },
    {
      code: `
        throw new Error("failure");
      `,
      errors: [{ messageId: "no-generic-error" }],
    },
    {
      code: `
        throw new Error("Something went wrong");
      `,
      errors: [{ messageId: "no-generic-error" }],
    },
    {
      code: `
        throw new Error("An error occurred");
      `,
      errors: [{ messageId: "no-generic-error" }],
    },
    {
      code: `
        throw new Error("Unknown error");
      `,
      errors: [{ messageId: "no-generic-error" }],
    },
    {
      code: `
        throw new Error("ERROR");
      `,
      errors: [{ messageId: "no-generic-error" }],
    },
  ],
});
