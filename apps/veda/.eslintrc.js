module.exports = {
  root: true,
  extends: ['custom'],
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.lint.json',
  },
};
