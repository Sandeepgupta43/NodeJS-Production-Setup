// eslint.config.js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended
)[0]; // destructure the first config block

export default [
  {
    ...baseConfig,
    files: ["**/*.ts", "**/*.js"],
    ignores: ["dist/**", "node_modules/**", "*.config.js"],
    languageOptions: {
      ...baseConfig.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
