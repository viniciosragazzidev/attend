//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";

export default [
  ...tanstackConfig,
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          alphabetize: false, // Desativa ordenação alfabética
          "newlines-between": "never", // Remove linhas em branco obrigatórias
        },
      ],
    },
  },
];
