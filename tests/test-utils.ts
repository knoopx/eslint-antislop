import type { ValidTestCase, InvalidTestCase } from "@typescript-eslint/rule-tester";

/**
 * Helper to create valid test cases with description
 */
export function createValidTests(code: string, description?: string): ValidTestCase<[]> {
  return {
    code,
    ...(description && { name: description }),
  };
}

/**
 * Helper to create invalid test cases with single error
 */
export function createInvalidTests(
  code: string,
  messageId: string = "default",
  description?: string
): InvalidTestCase<string, []> {
  return {
    code,
    errors: [
      {
        messageId,
      },
    ],
    ...(description && { name: description }),
  };
}

/**
 * Helper to create invalid test cases with multiple errors
 */
function createInvalidTestsMultiple(
  code: string,
  messageId: string = "default",
  count: number = 2,
  description?: string
): InvalidTestCase<string, []> {
  return {
    code,
    errors: Array(count)
      .fill(null)
      .map(() => ({ messageId })),
    ...(description && { name: description }),
  };
}



/**
 * Shared test data for TODO patterns
 */
export const sharedTodoPatterns = {
  valid: [
    createValidTests(
      `
        // Good comment explaining the code
        function process() {}
      `
    ),
    createValidTests(
      `
        // This is a normal comment
        const x = 5;
      `
    ),
  ],
  invalid: [
    createInvalidTests(
      `
        // TODO: implement this
        function placeholder() {}
      `
    ),
    createInvalidTests(
      `
        // FIXME: this is broken
        function buggy() {}
      `
    ),
    createInvalidTests(
      `
        // XXX: dangerous code
        function unsafe() {}
      `
    ),
    createInvalidTests(
      `
        // HACK: workaround
        function workaround() {}
      `
    ),
    createInvalidTests(
      `
        // NOTE: important
        function important() {}
      `
    ),
    createInvalidTests(
      `
        // TODO: fix this later
        const x = 5;
      `
    ),
    createInvalidTestsMultiple(
      `
        // FIXME: need to improve
        // HACK: temporary fix
        function multi() {}
      `,
      "default",
      2,
      "multiple markers"
    ),
  ],
};

/**
 * Shared test data for hallucinated imports
 */
export const sharedHallucinatedImports = {
  valid: [
    createValidTests(`import React from "react";`),
    createValidTests(`import lodash from "lodash";`),
    createValidTests(`import axios from "axios";`),
    createValidTests(`const express = require("express");`),
    createValidTests(`const { foo } = require("some-real-package");`),
  ],
  invalid: [
    createInvalidTests(`import something from "react-hooks";`, "hallucinated-import"),
    createInvalidTests(
      `import { useHook } from "react-native-webview";`,
      "hallucinated-import"
    ),
    createInvalidTests(`import foo from "lodash-es";`, "hallucinated-import"),
    createInvalidTests(`import bar from "axios-minified";`, "hallucinated-import"),
    createInvalidTests(
      `import handler from "express-async-handler";`,
      "hallucinated-import"
    ),
    createInvalidTests(`import { SEO } from "next-seo-plugin";`, "hallucinated-import"),
    createInvalidTests(
      `const util = require("typescript-utilities");`,
      "hallucinated-import"
    ),
    createInvalidTests(
      `import prettier from "eslint-config-prettier-standard";`,
      "hallucinated-import"
    ),
    createInvalidTests(
      `const { extended } = require("jest-extended-matchers");`,
      "hallucinated-import"
    ),
    createInvalidTests(
      `import devtools from "react-query-devtools";`,
      "hallucinated-import"
    ),
  ],
};
