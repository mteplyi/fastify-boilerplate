const { ESLint } = require('eslint');

const eslint = new ESLint();

module.exports = {
  '**/*.ts': async (files) => {
    const filesIgnored = await Promise.all(files.map((f) => eslint.isPathIgnored(f)));
    const filteredFiles = files.filter((_, i) => !filesIgnored[i]);
    return `eslint --max-warnings=0 ${filteredFiles.join(' ')}`;
  },
};
