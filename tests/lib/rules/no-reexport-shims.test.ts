import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-reexport-shims", testRules.noReexportShims, {
  valid: [
    {
      code: `
        // index.ts - allowed
        export { foo } from "./foo";
      `,
      filename: "index.ts",
    },
    {
      code: `
        // index.ts - allowed
        export * from "./utils";
      `,
      filename: "index.ts",
    },
    {
      code: `
        // This file has actual code
        export { foo } from "./foo";
        function bar() {
          return "bar";
        }
      `,
      filename: "not-index.ts",
    },
    {
      code: `
        // This file has actual code
        export * from "./utils";
        export const LOCAL = "value";
      `,
      filename: "not-index.ts",
    },
    {
      code: `
        // Empty file
      `,
      filename: "foo.ts",
    },
    {
      code: `
        const LOCAL = "value";
      `,
      filename: "foo.ts",
    },
  ],
  invalid: [
    {
      code: `
        export { foo } from "./foo";
      `,
      filename: "foo.ts",
      errors: [
        {
          messageId: "reexport-shim",
        },
      ],
    },
    {
      code: `
        export * from "./utils";
      `,
      filename: "utils-wrapper.ts",
      errors: [
        {
          messageId: "reexport-shim",
        },
      ],
    },
    {
      code: `
        export { foo } from "./foo";
        export { bar } from "./bar";
      `,
      filename: "reexport.ts",
      errors: [
        {
          messageId: "reexport-shim",
        },
        {
          messageId: "reexport-shim",
        },
      ],
    },
    {
      code: `
        export * from "./module";
        export { default } from "./default";
      `,
      filename: "index.tsx",
      errors: [
        {
          messageId: "reexport-shim",
        },
        {
          messageId: "reexport-shim",
        },
      ],
    },
    {
      code: `
        export { foo } from "./foo";
        export { bar } from "./bar";
        export * from "./all";
      `,
      filename: "shim.ts",
      errors: [
        {
          messageId: "reexport-shim",
        },
        {
          messageId: "reexport-shim",
        },
        {
          messageId: "reexport-shim",
        },
      ],
    },
  ],
});
