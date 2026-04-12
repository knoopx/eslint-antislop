import { RuleTester } from "@typescript-eslint/rule-tester";
import { testRules } from "../../../lib/rules/test-utils.js";

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

ruleTester.run("no-dead-code-patterns", testRules.noDeadCodePatterns, {
  valid: [
    {
      code: `
        // This is a normal comment
        const x = 5;
      `,
    },
    {
      code: `
        // TODO: implement this later
        function placeholder() {}
      `,
    },
    {
      code: `
        // @ts-expect-error: expected
        const x: number = "string";
      `,
    },
    {
      code: `
        console.log("test");
      `,
    },
  ],
  invalid: [
    {
      code: `
        // const x = 5;
        const y = 10;
      `,
      errors: [
        {
          messageId: "dead-code-pattern",
        },
      ],
    },
    {
      code: `
        // function oldFunc() {}
        function newFunc() {}
      `,
      errors: [
        {
          messageId: "dead-code-pattern",
        },
      ],
    },
    {
      code: `
        // class OldClass extends Base {}
        class NewClass {}
      `,
      errors: [
        {
          messageId: "dead-code-pattern",
        },
      ],
    },
    {
      code: `
        // if (condition) {
        //   doSomething();
        // }
        if (otherCondition) {
          doOtherThing();
        }
      `,
      errors: [
        {
          messageId: "dead-code-pattern",
        },
      ],
    },
    {
      code: `
        // for (let i = 0; i < arr.length; i++) {
        //   console.log(arr[i]);
        // }
        for (const item of items) {
          console.log(item);
        }
      `,
      errors: [
        {
          messageId: "dead-code-pattern",
        },
      ],
    },
    {
      code: `
        // import { foo } from "foo";
        import { bar } from "bar";
      `,
      errors: [
        {
          messageId: "dead-code-pattern",
        },
      ],
    },
    {
      code: `
        // export default MyClass;
        export default NewClass;
      `,
      errors: [
        {
          messageId: "dead-code-pattern",
        },
      ],
    },
    {
      code: `
        // while (running) {
        //   doWork();
        // }
        while (working) {
          process();
        }
      `,
      errors: [
        {
          messageId: "dead-code-pattern",
        },
      ],
    },
  ],
});
