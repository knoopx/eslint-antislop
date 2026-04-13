import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run(
  "no-deprecated-without-replacement",
  testRules.noDeprecatedWithoutReplacement,
  {
    valid: [
      {
        code: `
        /**
         * @deprecated Use newFunction instead
         */
        function oldFunction() {}
      `,
      },
    ],
    invalid: [
      {
        code: `
        /**
         * @deprecated
         */
        function oldFunction() {}
      `,
        errors: [{ messageId: "no-deprecated-no-replacement" }],
      },
      {
        code: `
        /**
         * @obsolete
         */
        function obsoleteFn() {}
      `,
        errors: [{ messageId: "no-deprecated-no-replacement" }],
      },
      {
        code: `
        /**
         * @removed
         */
        function removedFn() {}
      `,
        errors: [{ messageId: "no-deprecated-no-replacement" }],
      },
    ],
  },
);
