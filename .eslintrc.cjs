// TODO: convert to esm once eslint supports it.
// https://eslint.org/docs/user-guide/configuring#configuration-file-formats
// eslint-disable-next-line no-undef
module.exports = {
  plugins: ['prettier', 'import', 'html', 'json'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: { es2020: true, 'shared-node-browser': true },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
        arrowParens: 'always',
        endOfLine: 'lf',
      },
    ],
    indent: ['error', 2, { flatTernaryExpressions: false }],
    'no-undef': ['error'],
    'no-unused-vars': ['warn'],
    'linebreak-style': ['error', 'unix'],
    'arrow-parens': ['error', 'always'],
    'no-debugger': 'warn',
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/no-unresolved': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
  },
}
