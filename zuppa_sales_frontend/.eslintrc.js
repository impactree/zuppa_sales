module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'next/typescript',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['next.config.mjs', 'jest.setup.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 5,
    sourceType: 'module',
    project: './tsconfig.json', // Specify your tsconfig.json file
  },
  rules: {
    //no-extraneous-dependencies
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // Disallow usage of the `any` type
    '@typescript-eslint/no-explicit-any': 'error',
    // Disallow unused variables
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // Disallow unused imports
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // 'import/no-unused-modules': [1, { unusedExports: true }],
    // Enforce consistent return types
    // '@typescript-eslint/explicit-module-boundary-types': 'error',
    // Disallow the use of variables before they are defined
    'no-use-before-define': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    // Disallow unwanted imports
    'no-restricted-imports': [
      'error',
      {
        paths: [],
        // patterns: ['.*', '**/../*'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/require-default-props': 'off',
    'no-useless-escape': 'off',
    'import/no-cycle': 'off',
    'react/function-component-definition': 'off',
    // Disallow unused expressions
    'no-unused-expressions': 'error',
    // Disallow console logs
    'no-console': ['error', { allow: ['error'] }],
    // Disallow debugger statements
    'no-debugger': 'error',
    // Disallow commented-out code
    // 'no-warning-comments': [
    //   'error',
    //   {
    //     terms: ['todo', 'fixme', 'xxx', 'commented code'],
    //     location: 'start',
    //   },
    // ],
    // Enforce strict null checks
    // '@typescript-eslint/strict-boolean-expressions': 'error',

    'no-use-before-define': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
