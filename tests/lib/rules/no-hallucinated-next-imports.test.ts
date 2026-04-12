import { testRules } from "../../../lib/rules/test-utils.js";
import { createAsyncRuleTester } from "../../test-helpers.js";

const ruleTester = await createAsyncRuleTester();

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
      {
        code: `
        import { getStaticProps } from "next/server";
      `,
      },
      {
        code: `
        import { getStaticPaths } from "next/server";
      `,
      },
      {
        code: `
        import React from "react";
      `,
      },
      {
        code: `
        import { useRouter } from "next/navigation";
      `,
      },
    ],
    invalid: [
      {
        code: `
        import { getServerSideProps } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-next-import",
          },
        ],
      },
      {
        code: `
        import { getStaticProps } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-next-import",
          },
        ],
      },
      {
        code: `
        import { getStaticPaths } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-next-import",
          },
        ],
      },
      {
        code: `
        import { getServerSideProps, getStaticProps } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-next-import",
          },
          {
            messageId: "hallucinated-next-import",
          },
        ],
      },
    ],
  },
);
