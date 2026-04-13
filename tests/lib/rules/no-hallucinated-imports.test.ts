import { testRules } from "../../../lib/rules/test-utils.js";
import {
  createRuleTester,
  createInvalidHallucinatedImportsTestCases,
} from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-hallucinated-imports", testRules.noHallucinatedImports, {
  valid: [
    {
      code: `
        import fs from "fs";
      `,
    },
  ],
  // @ts-expect-error -- Rule uses message template without meta.messages, so errors use plain `message` not `messageId`
  invalid: createInvalidHallucinatedImportsTestCases(),
});
