import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-boilerplate-wrappers", testRules.noBoilerplateWrappers, {
  valid: [
    {
      code: `
        const transform = (x) => x * 2;
      `,
    },
    {
      code: `
        const wrapper = (data) => {
          const processed = processData(data);
          return { success: true, data: processed };
        };
      `,
    },
    {
      code: `
        function wrapped() {
          return someFunction();
        }
      `,
    },
    {
      code: `
        const wrapper = (input) => {
          return anotherFunction(input);
        };
      `,
    },
    {
      code: `
        const wrapper = () => {
          console.log("doing work");
          return someFunction();
        };
      `,
    },
    {
      code: `
        const wrapper = () => {
          const result = someFunction();
          return transform(result);
        };
      `,
    },
  ],
  invalid: [
    {
      code: `
        const myWrapper = () => {
          return someFunction();
        };
      `,
      errors: [
        {
          messageId: "boilerplate-wrapper",
        },
      ],
    },
    {
      code: `
        const wrapped = () => {
          return fetchData();
        };
      `,
      errors: [
        {
          messageId: "boilerplate-wrapper",
        },
      ],
    },
    {
      code: `
        const processWrapper = () => {
          return processData();
        };
      `,
      errors: [
        {
          messageId: "boilerplate-wrapper",
        },
      ],
    },
    {
      code: `
        const apiWrapper = () => {
          return apiCall();
        };
      `,
      errors: [
        {
          messageId: "boilerplate-wrapper",
        },
      ],
    },
    {
      code: `
        const wrapIt = () => {
          return doIt();
        };
      `,
      errors: [
        {
          messageId: "boilerplate-wrapper",
        },
      ],
    },
    {
      code: `
        const wrapper1 = () => {
          return func1();
        };
        const wrapper2 = () => {
          return func2();
        };
      `,
      errors: [
        {
          messageId: "boilerplate-wrapper",
        },
        {
          messageId: "boilerplate-wrapper",
        },
      ],
    },
  ],
});
