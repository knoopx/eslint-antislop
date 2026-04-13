import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-import-aliases", testRules.noImportAliases, {
  valid: [
    {
      code: `
        import { useState } from "react";
      `,
    },
  ],
  invalid: [
    {
      code: `
        import { useState as useSt } from "react";
      `,
      errors: [{ message: /Import alias.*for/ }],
    },
    {
      code: `
        import { useEffect as useEf } from "react";
      `,
      errors: [{ message: /Import alias.*for/ }],
    },
    {
      code: `
        import { React, Component as C } from "react";
      `,
      errors: [{ message: /Import alias.*for/ }],
    },
    {
      code: `
        import { default as MyComponent } from "./MyComponent";
      `,
      errors: [{ message: /Import alias.*for/ }],
    },
    {
      code: `
        import { foo as bar, baz as qux } from "foo";
      `,
      errors: [
        { message: /Import alias.*for/ },
        { message: /Import alias.*for/ },
      ],
    },
  ],
} as unknown as Parameters<typeof ruleTester.run>[2]);
