import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-debug-assertions", testRules.noDebugAssertions, {
  valid: [
    {
      code: `
        function validate(x) {
          if (x < 0) throw new Error("x must be positive");
          return x;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        debugger;
      `,
      errors: [{ messageId: "no-debug-statement" }],
    },
    {
      code: `
        function check() {
          debugger;
          return true;
        }
      `,
      errors: [{ messageId: "no-debug-statement" }],
    },
    {
      code: `
        console.assert(condition, "message");
      `,
      errors: [{ messageId: "no-debug-statement" }],
    },
    {
      code: `
        function validate() {
          console.assert(x > 0, "x must be positive");
        }
      `,
      errors: [{ messageId: "no-debug-statement" }],
    },
    {
      code: `
        debugger;
        console.assert(condition);
      `,
      errors: [
        { messageId: "no-debug-statement" },
        { messageId: "no-debug-statement" },
      ],
    },
  ],
});
