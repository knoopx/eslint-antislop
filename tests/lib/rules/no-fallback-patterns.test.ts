import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-fallback-patterns", testRules.noFallbackPatterns, {
  valid: [
    {
      code: `
        const data = fetchOrCache();
      `,
    },
  ],
  invalid: [
    {
      code: `
        // Fallback to default value
        const x = getValue() || "default";
      `,
      errors: [{ messageId: "no-fallback-pattern" }],
    },
    {
      code: `
        // Use fallback if not available
        const value = data || fallbackValue;
      `,
      errors: [{ messageId: "no-fallback-pattern" }],
    },
    {
      code: `
        // graceful degradation if network fails
        const data = fetchOrCache();
      `,
      errors: [{ messageId: "no-fallback-pattern" }],
    },
    {
      code: `
        // fallback for missing data
        const result = compute() || null;
      `,
      errors: [{ messageId: "no-fallback-pattern" }],
    },
    {
      code: `
        // backup solution when offline
        const config = fetchConfig() || localConfig;
      `,
      errors: [{ messageId: "no-fallback-pattern" }],
    },
    {
      code: `
        // degrade gracefully if API unavailable
        const response = apiCall() || defaultResponse;
      `,
      errors: [{ messageId: "no-fallback-pattern" }],
    },
  ],
});
