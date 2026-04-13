import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

const valid = [
  {
    code: `
        // This function processes data
        function processData() {}
      `,
  },
  {
    code: `
        // TODO: implement this
        function placeholder() {}
      `,
  },
  {
    code: `
        console.log("test");
      `,
  },
];

const invalid = [
  {
    code: `
        // Assuming this will work
        function test() {}
      `,
    output: `
        function test() {}
      `,
    errors: [{ message: /Delete assumption comment/ }],
  },
  {
    code: `
        // Assumes the data is valid
        const data = input.data;
      `,
    output: `
        const data = input.data;
      `,
    errors: [{ message: /Delete assumption comment/ }],
  },
  {
    code: `
        // I assume this is correct
        const x = compute();
      `,
    output: `
        const x = compute();
      `,
    errors: [{ message: /Delete assumption comment/ }],
  },
  {
    code: `
        // Presumably this works
        const result = process(input);
      `,
    output: `
        const result = process(input);
      `,
    errors: [{ message: /Delete assumption comment/ }],
  },
  {
    code: `
        // Apparently this is the right way
        const solution = applyMethod();
      `,
    output: `
        const solution = applyMethod();
      `,
    errors: [{ message: /Delete assumption comment/ }],
  },
  {
    code: `
        // It seems like this should work
        function tryIt() {}
      `,
    output: `
        function tryIt() {}
      `,
    errors: [{ message: /Delete assumption comment/ }],
  },
  {
    code: `
        // Seems like the correct approach
        const approach = method();
      `,
    output: `
        const approach = method();
      `,
    errors: [{ message: /Delete assumption comment/ }],
  },
  {
    code: `
        // Assuming this will work, but may not
        function uncertain() {}
      `,
    output: `
        function uncertain() {}
      `,
    errors: [{ message: /Delete assumption comment/ }],
  },
] as unknown as Parameters<typeof ruleTester.run>[2]["invalid"];

ruleTester.run("no-assumption-comments", testRules.noAssumptionComments, {
  valid,
  invalid,
});
