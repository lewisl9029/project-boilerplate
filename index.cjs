// TODO: refactor into env specific modules with shared pieces
const environments = {
  node: 'node',
  deno: 'deno',
  browser: 'browser',
  none: 'none',
}

const env = {
  [environments.node]: { node: true },
  [environments.browser]: { browser: true },
  [environments.deno]: { browser: true },
  [environments.none]: {},
}

const eslintConfig = ({ environment = environments.browser, isRoot } = {}) => ({
  root: !!isRoot,
  plugins: [
    // 'prettier',
    'import',
    'html',
    'json',
    'react-hooks',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: { es2021: true, ...env[environment] },
  overrides: [
    {
      files: ['**/*.cjs'],
      env: env.node,
    },
  ],
  globals:
    environment === environments.deno
      ? {
          Deno: 'readonly',
        }
      : undefined,
  rules: {
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     singleQuote: true,
    //     semi: false,
    //     trailingComma: 'all',
    //     arrowParens: 'always',
    //     endOfLine: 'lf',
    //   },
    // ],
    // This conflicts with prettier and results in alternate errors on fix
    // indent: ['error', 2, { flatTernaryExpressions: false }],
    'no-undef': ['error'],
    'no-unused-vars': [
      'warn',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'linebreak-style': ['error', 'unix'],
    'arrow-parens': ['error', 'always'],
    'no-debugger': 'warn',
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-extraneous-dependencies': [
      'error',
      {
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
    'import/no-unresolved': ['error', { ignore: ['^https://.*$'] }],
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
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: '(.*useCallback|.*useEffect)',
      },
    ],
  },
})

const eslintConfigWithImportmap = ({ config, root, importmapPath }) => {
  const imports = JSON.parse(require('fs').readFileSync(importmapPath)).imports
  return {
    ...config,
    rules: {
      ...config.rules,
      'import/no-unresolved': [
        'error',
        {
          ignore: [
            ...config.rules['import/no-unresolved']?.[1]?.ignore,
            ...Object.entries(imports)
              .filter(([_from, to]) => to.startsWith('https://'))
              .map(([from, _to]) => from),
          ],
        },
      ],
    },
    settings: {
      ...config.settings,
      'import/resolver': {
        alias: Object.entries(imports).map(([from, to]) => [
          from.endsWith('/') ? from.slice(0, -1) : from,
          to.startsWith('/') ? `${root}${to}` : to,
        ]),
      },
    },
  }
}

const babelConfig = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-syntax-top-level-await',
  ],
}

const prettierConfig = {
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'lf',
}

module.exports = {
  environments,
  eslintConfig,
  eslintConfigWithImportmap,
  babelConfig,
  prettierConfig,
}
