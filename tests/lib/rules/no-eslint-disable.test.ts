import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-eslint-disable", testRules.noEslintDisable, {
  valid: [
    {
      code: `
        const x = 5;
      `,
    },
    {
      code: `
        // normal comment
        function test() {}
      `,
    },
  ],
  invalid: [
    {
      code: `
        // eslint-disable
        console.log("hidden");
      `,
      errors: [
        {
          messageId: "eslint-disable",
        },
      ],
    },
  ],
});
