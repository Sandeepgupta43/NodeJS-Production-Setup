// eslint.config.js
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      import: pluginImport,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      ...pluginTs.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-unused-vars': ['error'],
      'import/order': ['warn', { 'newlines-between': 'always' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
];
