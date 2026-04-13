import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-eslint-disable", testRules.noEslintDisable, {
  valid: [
    {
      code: `
        console.log("test");
      `,
    },
  ],
  invalid: [
    {
      code: `
        // eslint-disable
        console.log("hidden");
      `,
      errors: [{ messageId: "no-eslint-disable" }],
    },
  ],
});
