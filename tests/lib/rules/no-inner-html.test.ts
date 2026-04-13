import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-inner-html", testRules.noInnerHtml, {
  valid: [
    {
      code: `
        const div = document.createElement("div");
        div.textContent = "hello";
      `,
    },
  ],
  invalid: [
    {
      code: `
        element.innerHTML = "hello";
      `,
      errors: [{ messageId: "no-inner-html" }],
    },
    {
      code: `
        container.innerHTML = "<p>HTML content</p>";
      `,
      errors: [{ messageId: "no-inner-html" }],
    },
    {
      code: `
        div.innerHTML = data.html;
      `,
      errors: [{ messageId: "no-inner-html" }],
    },
    {
      code: `
        element.innerHTML = "<div>" + content + "</div>";
      `,
      errors: [{ messageId: "no-inner-html" }],
    },
    {
      code: `
        <div dangerouslySetInnerHTML={{ __html: content }} />
      `,
      errors: [{ messageId: "no-inner-html" }],
    },
    {
      code: `
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      `,
      errors: [{ messageId: "no-inner-html" }],
    },
  ],
});
