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
         * @deprecated Use oldFunction instead
         */
        function oldFunction() {}
      `,
      },
      {
        code: `
        /**
         * @deprecated replaced by newFunction
         */
        function deprecatedFn() {}
      `,
      },
      {
        code: `
        /**
         * @deprecated migrate to newApi
         */
        function legacyFn() {}
      `,
      },
      {
        code: `
        /**
         * @deprecated Use newFunction instead
         */
        function deprecatedFn() {}
      `,
      },
      {
        code: `
        // This is not deprecated
        function regularFn() {}
      `,
      },
      {
        code: `
        /**
         * Remove this function
         */
        function toRemove() {}
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
        errors: [
          {
            messageId: "deprecated-no-replacement",
          },
        ],
      },
      {
        code: `
        /**
         * @obsolete
         */
        function obsoleteFn() {}
      `,
        errors: [
          {
            messageId: "deprecated-no-replacement",
          },
        ],
      },
      {
        code: `
        /**
         * @removed
         */
        function removedFn() {}
      `,
        errors: [
          {
            messageId: "deprecated-no-replacement",
          },
        ],
      },
    ],
  },
);
