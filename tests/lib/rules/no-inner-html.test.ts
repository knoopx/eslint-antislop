import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-inner-html", testRules.noInnerHtml, {
  valid: [
    {
      code: `
        element.textContent = "hello";
      `,
    },
    {
      code: `
        const safe = "not innerHTML";
      `,
    },
    {
      code: `
        element.innerText = "hello";
      `,
    },
  ],
  invalid: [
    {
      code: `
        element.innerHTML = "hello";
      `,
      errors: [
        {
          messageId: "inner-html",
        },
      ],
    },
    {
      code: `
        container.innerHTML = "<p>HTML content</p>";
      `,
      errors: [
        {
          messageId: "inner-html",
        },
      ],
    },
    {
      code: `
        div.innerHTML = data.html;
      `,
      errors: [
        {
          messageId: "inner-html",
        },
      ],
    },
    {
      code: `
        element.innerHTML = "<div>" + content + "</div>";
      `,
      errors: [
        {
          messageId: "inner-html",
        },
      ],
    },
    {
      code: `
        <div dangerouslySetInnerHTML={{ __html: content }} />
      `,
      errors: [
        {
          messageId: "inner-html",
        },
      ],
    },
    {
      code: `
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      `,
      errors: [
        {
          messageId: "inner-html",
        },
      ],
    },
  ],
});
