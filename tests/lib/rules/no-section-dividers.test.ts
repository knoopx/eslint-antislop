import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-section-dividers", testRules.noSectionDividers, {
  valid: [
    {
      code: `
        // License header
        // Copyright 2024 Example Corp
      `,
    },
    {
      code: `
        // Normal comment without special meaning
        console.log("test");
      `,
    },
    {
      code: `
        // This is a normal comment
        const x = 5;
      `,
    },
    {
      code: `
        /* Multi-line
           comment */
      `,
    },
  ],
  invalid: [
    {
      code: `
        // ==========
        // Section 1
        // ==========
        function section1() {}
      `,
      errors: [
        { messageId: "no-section-divider" },
        { messageId: "no-section-divider" },
      ],
    },
    {
      code: `
        // --------
        const x = 5;
      `,
      errors: [{ messageId: "no-section-divider" }],
    },
    {
      code: `
        // ~~~~~~~
        const y = 10;
      `,
      errors: [{ messageId: "no-section-divider" }],
    },
    {
      code: `
        // ***********
        function section2() {}
      `,
      errors: [{ messageId: "no-section-divider" }],
    },
    {
      code: `
        // ==== 
        // More section
        // ====
        const z = 15;
      `,
      errors: [
        { messageId: "no-section-divider" },
        { messageId: "no-section-divider" },
      ],
    },
    {
      code: `
        // ===
        const a = 1;
        // ===
        const b = 2;
      `,
      errors: [
        { messageId: "no-section-divider" },
        { messageId: "no-section-divider" },
      ],
    },
    {
      code: `
        // ===========================================================================
        // SIMPLICITY
        // ===========================================================================
        function section() {}
      `,
      errors: [
        { messageId: "no-section-divider" },
        { messageId: "no-section-divider" },
      ],
    },
  ],
});
