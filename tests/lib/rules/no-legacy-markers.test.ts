import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-legacy-markers", testRules.noLegacyMarkers, {
  valid: [
    {
      code: `
        // This is being migrated
        function oldCode() {}
      `,
    },
    {
      code: `
        // Replaced by new implementation
        function deprecatedFunc() {}
      `,
    },
    {
      code: `
        // Removed in v2
        function removedFunc() {}
      `,
    },
    {
      code: `
        // eslint-disable-next-line @rule-tester/no-legacy-markers
        // legacy code marker
        function oldFunc() {}
      `,
    },
    {
      code: `
        // This code is outdated but will be deleted soon
        function oldStuff() {}
      `,
    },
  ],
  invalid: [
    {
      code: `
        // legacy code that needs attention
        function oldFunc() {}
      `,
      errors: [{ messageId: "no-legacy-marker" }],
    },
    {
      code: `
        // Deprecated but not replaced
        function oldMethod() {}
      `,
      errors: [{ messageId: "no-legacy-marker" }],
    },
    {
      code: `
        // obsolete function
        function deprecatedFunc() {}
      `,
      errors: [{ messageId: "no-legacy-marker" }],
    },
    {
      code: `
        // outdated implementation
        function oldCode() {}
      `,
      errors: [{ messageId: "no-legacy-marker" }],
    },
    {
      code: `
        // old code here
        function legacyFunc() {}
      `,
      errors: [{ messageId: "no-legacy-marker" }],
    },
    {
      code: `
        // old version of this
        function legacyCode() {}
      `,
      errors: [{ messageId: "no-legacy-marker" }],
    },
  ],
});
