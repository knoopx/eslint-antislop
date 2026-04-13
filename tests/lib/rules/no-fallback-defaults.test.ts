import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-fallback-defaults", testRules.noFallbackDefaults, {
  valid: [
    {
      code: `
        const userId = getUserId();
        if (!userId) throw new Error("userId required");
      `,
    },
  ],
  invalid: [
    {
      code: `
        // Required field - should crash if missing
        const userId = getUserId() || "anonymous";
      `,
      errors: [{ messageId: "no-fallback-default" }],
    },
    {
      code: `
        // Mandatory parameter
        const email = getEmail() || "noreply@example.com";
      `,
      errors: [{ messageId: "no-fallback-default" }],
    },
    {
      code: `
        // critical configuration value
        const apiKey = getConfig().apiKey || "default-key";
      `,
      errors: [{ messageId: "no-fallback-default" }],
    },
    {
      code: `
        // Required for operation
        const token = getToken() || generateToken();
      `,
      errors: [{ messageId: "no-fallback-default" }],
    },
  ],
});
