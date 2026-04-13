import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run("no-dead-code-patterns", testRules.noDeadCodePatterns, {
  valid: [
    {
      code: `
        const y = 10;
      `,
    },
  ],
  invalid: [
    {
      code: `
        // const x = 5;
        const y = 10;
      `,
      errors: [{ messageId: "no-dead-code-pattern" }],
    },
    {
      code: `
        // function oldFunc() {}
        function newFunc() {}
      `,
      errors: [{ messageId: "no-dead-code-pattern" }],
    },
    {
      code: `
        // class OldClass extends Base {}
        class NewClass {}
      `,
      errors: [{ messageId: "no-dead-code-pattern" }],
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
      errors: [{ messageId: "no-dead-code-pattern" }],
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
      errors: [{ messageId: "no-dead-code-pattern" }],
    },
    {
      code: `
        // import { foo } from "foo";
        import { bar } from "bar";
      `,
      errors: [{ messageId: "no-dead-code-pattern" }],
    },
    {
      code: `
        // export default MyClass;
        export default NewClass;
      `,
      errors: [{ messageId: "no-dead-code-pattern" }],
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
      errors: [{ messageId: "no-dead-code-pattern" }],
    },
  ],
});
