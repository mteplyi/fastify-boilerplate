module.exports = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,
  endOfLine: 'lf',

  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.js', '*.ts'],
      options: {
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        bracketSpacing: true,
        importOrder: [
          '^.+/bootstrap$',
          '^reflect-metadata$',
          '^node:.+$',
          '<THIRD_PARTY_MODULES>',
          '^(sdk|src)(/.+)?$',
          '^[./]',
        ],
        importOrderSeparation: true,
      },
    },
  ],
};
