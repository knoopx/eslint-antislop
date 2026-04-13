import { testRules } from "../../../lib/rules/test-utils.js";
import {
  createRuleTester,
  createInvalidMagicCssTestCases,
} from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-magic-css", testRules.noMagicCss, {
  valid: [
    {
      code: `
        const styles = { padding: theme.spacing(1) };
      `,
    },
  ],
  // @ts-expect-error -- Rule uses message template without meta.messages, so errors use plain `message` not `messageId`
  invalid: createInvalidMagicCssTestCases(),
});
