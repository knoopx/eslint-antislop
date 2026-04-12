import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-async-without-await", testRules.noAsyncWithoutAwait, {
  valid: [
    {
      code: `
        async function fetchData() {
          return await fetch("/api");
        }
      `,
    },
    {
      code: `
        async function process() {
          const result = await someAsyncOperation();
          return result;
        }
      `,
    },
    {
      code: `
        function syncFunction() {
          return "hello";
        }
      `,
    },
    {
      code: `
        const asyncFn = async () => {
          return await something();
        };
      `,
    },
    {
      code: `
        class MyClass {
          async method() {
            await this.doSomething();
          }
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        async function doSomething() {
          console.log("doing something");
        }
      `,
      errors: [
        {
          messageId: "no-async-without-await",
        },
      ],
    },
    {
      code: `
        async function fetchData() {
          console.log("fetching data");
          return "data";
        }
      `,
      errors: [
        {
          messageId: "no-async-without-await",
        },
      ],
    },
    {
      code: `
        async () => {
          console.log("async without await");
        };
      `,
      errors: [
        {
          messageId: "no-async-without-await",
        },
      ],
    },
    {
      code: `
        async () => {
          return "not awaited";
        };
      `,
      errors: [
        {
          messageId: "no-async-without-await",
        },
      ],
    },
    {
      code: `
        async function sendEmail() {
          const email = { to: "user@example.com" };
          console.log(email);
        }
      `,
      errors: [
        {
          messageId: "no-async-without-await",
        },
      ],
    },
    {
      code: `
        async function processItems() {
          for (const item of items) {
            console.log(item);
          }
        }
      `,
      errors: [
        {
          messageId: "no-async-without-await",
        },
      ],
    },
  ],
});
