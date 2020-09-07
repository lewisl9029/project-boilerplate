const env = {
  node: { node: true },
  browser: { browser: true },
}

const config = ({ environment = 'browser' } = {}) => ({
  plugins: ['prettier', 'import', 'html', 'json'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: { es2021: true, ...env[environment] },
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
    // This conflicts with prettier and results in alternate errors on fix
    // indent: ['error', 2, { flatTernaryExpressions: false }],
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
})

module.exports = {
  config,
}
