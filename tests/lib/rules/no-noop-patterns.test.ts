import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-noop-patterns", testRules.noNoopPatterns, {
  valid: [
    {
      code: `
        function doWork() {
          return process();
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        // noop placeholder
        function doNothing() {}
      `,
      errors: [{ messageId: "no-noop-pattern" }],
    },
    {
      code: `
        // no-op function
        function placeholder() {}
      `,
      errors: [{ messageId: "no-noop-pattern" }],
    },
    {
      code: `
        // no operation needed here
        function process() {}
      `,
      errors: [{ messageId: "no-noop-pattern" }],
    },
    {
      code: `
        // do nothing for now
        function placeholder() {}
      `,
      errors: [{ messageId: "no-noop-pattern" }],
    },
    {
      code: `
        // empty body
        function handler() {}
      `,
      errors: [{ messageId: "no-noop-pattern" }],
    },
    {
      code: `
        // empty function stub
        function stub() {}
      `,
      errors: [{ messageId: "no-noop-pattern" }],
    },
  ],
});
