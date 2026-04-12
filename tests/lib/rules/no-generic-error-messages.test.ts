import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-generic-error-messages", testRules.noGenericErrorMessages, {
  valid: [
    {
      code: `
        throw new Error("Failed to process user data");
      `,
    },
    {
      code: `
        throw new Error("Network request failed: timeout");
      `,
    },
    {
      code: `
        throw new Error("Invalid input provided");
      `,
    },
    {
      code: `
        throw new Error("Database connection failed");
      `,
    },
    {
      code: `
        throw new Error("Authentication failed: invalid token");
      `,
    },
    {
      code: `
        const msg = "error";
      `,
    },
  ],
  invalid: [
    {
      code: `
        throw new Error("error");
      `,
      errors: [
        {
          messageId: "generic-error",
        },
      ],
    },
    {
      code: `
        throw new Error("failed");
      `,
      errors: [
        {
          messageId: "generic-error",
        },
      ],
    },
    {
      code: `
        throw new Error("failure");
      `,
      errors: [
        {
          messageId: "generic-error",
        },
      ],
    },
    {
      code: `
        throw new Error("Something went wrong");
      `,
      errors: [
        {
          messageId: "generic-error",
        },
      ],
    },
    {
      code: `
        throw new Error("An error occurred");
      `,
      errors: [
        {
          messageId: "generic-error",
        },
      ],
    },
    {
      code: `
        throw new Error("Unknown error");
      `,
      errors: [
        {
          messageId: "generic-error",
        },
      ],
    },
    {
      code: `
        throw new Error("ERROR");
      `,
      errors: [
        {
          messageId: "generic-error",
        },
      ],
    },
  ],
});
