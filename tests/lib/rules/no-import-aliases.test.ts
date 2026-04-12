import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-import-aliases", testRules.noImportAliases, {
  valid: [
    {
      code: `
        import React from "react";
      `,
    },
    {
      code: `
        import { useState } from "react";
      `,
    },
    {
      code: `
        import { useState, useEffect } from "react";
      `,
    },
    {
      code: `
        import * as utils from "./utils";
      `,
    },
    {
      code: `
        import foo from "foo";
      `,
    },
  ],
  invalid: [
    {
      code: `
        import { useState as useSt } from "react";
      `,
      errors: [
        {
          messageId: "import-alias",
        },
      ],
    },
    {
      code: `
        import { useEffect as useEf } from "react";
      `,
      errors: [
        {
          messageId: "import-alias",
        },
      ],
    },
    {
      code: `
        import { React, Component as C } from "react";
      `,
      errors: [
        {
          messageId: "import-alias",
        },
      ],
    },
    {
      code: `
        import { default as MyComponent } from "./MyComponent";
      `,
      errors: [
        {
          messageId: "import-alias",
        },
      ],
    },
    {
      code: `
        import { foo as bar, baz as qux } from "foo";
      `,
      errors: [
        {
          messageId: "import-alias",
        },
        {
          messageId: "import-alias",
        },
      ],
    },
  ],
});
