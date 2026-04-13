import { testRules } from "../../../lib/rules/test-utils.js";
import { createRuleTester } from "../../test-helpers.js";

const ruleTester = createRuleTester();

ruleTester.run(
  "no-hallucinated-react-imports",
  testRules.noHallucinatedReactImports,
  {
    valid: [
      {
        code: `
        import { useState } from "react";
      `,
      },
    ],
    invalid: [
      {
        code: `
        import { useRouter } from "react";
      `,
        errors: [{ message: /does not exist in 'react'/ }],
      },
      {
        code: `
        import { useParams } from "react";
      `,
        errors: [{ message: /does not exist in 'react'/ }],
      },
      {
        code: `
        import { useSearchParams } from "react";
      `,
        errors: [{ message: /does not exist in 'react'/ }],
      },
      {
        code: `
        import { Link } from "react";
      `,
        errors: [{ message: /does not exist in 'react'/ }],
      },
      {
        code: `
        import { Image } from "react";
      `,
        errors: [{ message: /does not exist in 'react'/ }],
      },
      {
        code: `
        import { Script } from "react";
      `,
        errors: [{ message: /does not exist in 'react'/ }],
      },
      {
        code: `
        import { useRouter, useParams } from "react";
      `,
        errors: [
          { message: /does not exist in 'react'/ },
          { message: /does not exist in 'react'/ },
        ],
      },
    ],
  } as unknown as Parameters<typeof ruleTester.run>[2],
);
