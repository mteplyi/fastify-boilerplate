module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier/prettier',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-await-in-loop': 'off',
  },
  ignorePatterns: '*.js',
};
