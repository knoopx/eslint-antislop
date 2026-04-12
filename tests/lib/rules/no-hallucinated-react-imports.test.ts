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
        import React, { useState } from "react";
      `,
      },
      {
        code: `
        import { useEffect, useMemo } from "react";
      `,
      },
      {
        code: `
        import { useRouter } from "next/navigation";
      `,
      },
      {
        code: `
        import { Link } from "react-router-dom";
      `,
      },
      {
        code: `
        import { Image } from "expo";
      `,
      },
    ],
    invalid: [
      {
        code: `
        import { useRouter } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-react-import",
          },
        ],
      },
      {
        code: `
        import { useParams } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-react-import",
          },
        ],
      },
      {
        code: `
        import { useSearchParams } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-react-import",
          },
        ],
      },
      {
        code: `
        import { Link } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-react-import",
          },
        ],
      },
      {
        code: `
        import { Image } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-react-import",
          },
        ],
      },
      {
        code: `
        import { Script } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-react-import",
          },
        ],
      },
      {
        code: `
        import { useRouter, useParams } from "react";
      `,
        errors: [
          {
            messageId: "hallucinated-react-import",
          },
          {
            messageId: "hallucinated-react-import",
          },
        ],
      },
    ],
  },
);
