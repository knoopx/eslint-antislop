import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run(
  "no-hallucinated-next-imports",
  testRules.noHallucinatedNextImports,
  {
    valid: [
      {
        code: `
        import { getServerSideProps } from "next/server";
      `,
      },
    ],
    invalid: [
      {
        code: `
        import { getServerSideProps } from "react";
      `,
        errors: [{ message: /Next.js page export/ }],
      },
      {
        code: `
        import { getStaticProps } from "react";
      `,
        errors: [{ message: /Next.js page export/ }],
      },
      {
        code: `
        import { getStaticPaths } from "react";
      `,
        errors: [{ message: /Next.js page export/ }],
      },
      {
        code: `
        import { getServerSideProps, getStaticProps } from "react";
      `,
        errors: [
          { message: /Next.js page export/ },
          { message: /Next.js page export/ },
        ],
      },
    ],
  } as unknown as Parameters<typeof ruleTester.run>[2],
);
