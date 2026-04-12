import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-fallback-defaults", testRules.noFallbackDefaults, {
  valid: [
    {
      code: `
        // Optional field
        const x = getValue() || "default";
      `,
    },
    {
      code: `
        // This is optional
        const value = data?.value ?? "default";
      `,
    },
    {
      code: `
        const config = getOptionalConfig() || defaultConfig;
      `,
    },
  ],
  invalid: [
    {
      code: `
        // Required field - should crash if missing
        const userId = getUserId() || "anonymous";
      `,
      errors: [
        {
          messageId: "fallback-default",
        },
      ],
    },
    {
      code: `
        // Mandatory parameter
        const email = getEmail() || "noreply@example.com";
      `,
      errors: [
        {
          messageId: "fallback-default",
        },
      ],
    },
    {
      code: `
        // critical configuration value
        const apiKey = getConfig().apiKey || "default-key";
      `,
      errors: [
        {
          messageId: "fallback-default",
        },
      ],
    },
    {
      code: `
        // Required for operation
        const token = getToken() || generateToken();
      `,
      errors: [
        {
          messageId: "fallback-default",
        },
      ],
    },
  ],
});
