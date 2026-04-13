import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-reexport-shims", testRules.noReexportShims, {
  valid: [
    {
      code: `
        import { foo } from "./foo";
        export { foo };
      `,
    },
  ],
  invalid: [
    {
      code: `
        export { foo } from "./foo";
      `,
      errors: [{ messageId: "no-reexport-shim" }],
    },
    {
      code: `
        export * from "./utils";
      `,
      errors: [{ messageId: "no-reexport-shim" }],
    },
    {
      code: `
        export { foo } from "./foo";
        export { bar } from "./bar";
      `,
      errors: [
        { messageId: "no-reexport-shim" },
        { messageId: "no-reexport-shim" },
      ],
    },
    {
      code: `
        export * from "./module";
        export { default } from "./default";
      `,
      errors: [
        { messageId: "no-reexport-shim" },
        { messageId: "no-reexport-shim" },
      ],
    },
    {
      code: `
        export { foo } from "./foo";
        export { bar } from "./bar";
        export * from "./all";
      `,
      errors: [
        { messageId: "no-reexport-shim" },
        { messageId: "no-reexport-shim" },
        { messageId: "no-reexport-shim" },
      ],
    },
  ],
});
