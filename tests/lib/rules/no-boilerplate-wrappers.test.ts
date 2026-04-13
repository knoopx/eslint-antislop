import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-boilerplate-wrappers", testRules.noBoilerplateWrappers, {
  valid: [
    {
      code: `
        function myFunction() {
          return someFunction();
        }
      `,
    },
    {
      code: `
        const wrapped = (arg) => {
          return processData(arg);
        };
      `,
    },
    {
      code: `
        function apiCall(url) {
          return fetch(url).then(res => res.json());
        }
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
      errors: [{ message: /Wrapper.*just calls/ }],
    },
    {
      code: `
        const wrapped = () => {
          return fetchData();
        };
      `,
      errors: [{ message: /Wrapper.*just calls/ }],
    },
    {
      code: `
        const processWrapper = () => {
          return processData();
        };
      `,
      errors: [{ message: /Wrapper.*just calls/ }],
    },
    {
      code: `
        const apiWrapper = () => {
          return apiCall();
        };
      `,
      errors: [{ message: /Wrapper.*just calls/ }],
    },
    {
      code: `
        const wrapIt = () => {
          return doIt();
        };
      `,
      errors: [{ message: /Wrapper.*just calls/ }],
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
        { message: /Wrapper.*just calls/ },
        { message: /Wrapper.*just calls/ },
      ],
    },
  ],
} as unknown as Parameters<typeof ruleTester.run>[2]);
