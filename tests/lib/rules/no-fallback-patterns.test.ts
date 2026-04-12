import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-fallback-patterns", testRules.noFallbackPatterns, {
  valid: [
    {
      code: `
        // Error handling is done here
        function handleError() {}
      `,
    },
    {
      code: `
        // This will throw an error
        function throws() {}
      `,
    },
    {
      code: `
        // Throw if missing
        function fail() {}
      `,
    },
  ],
  invalid: [
    {
      code: `
        // Fallback to default value
        const x = getValue() || "default";
      `,
      errors: [
        {
          messageId: "fallback-pattern",
        },
      ],
    },
    {
      code: `
        // Use fallback if not available
        const value = data || fallbackValue;
      `,
      errors: [
        {
          messageId: "fallback-pattern",
        },
      ],
    },
    {
      code: `
        // graceful degradation if network fails
        const data = fetchOrCache();
      `,
      errors: [
        {
          messageId: "fallback-pattern",
        },
      ],
    },
    {
      code: `
        // fallback for missing data
        const result = compute() || null;
      `,
      errors: [
        {
          messageId: "fallback-pattern",
        },
      ],
    },
    {
      code: `
        // backup solution when offline
        const config = fetchConfig() || localConfig;
      `,
      errors: [
        {
          messageId: "fallback-pattern",
        },
      ],
    },
    {
      code: `
        // degrade gracefully if API unavailable
        const response = apiCall() || defaultResponse;
      `,
      errors: [
        {
          messageId: "fallback-pattern",
        },
      ],
    },
  ],
});
