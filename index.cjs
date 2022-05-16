// const path_ = require('path')

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
    '@lewisl9029/react-hooks-for-react-anonymous',
    '@typescript-eslint/eslint-plugin',
  ],
  parser: '@typescript-eslint/parser',
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
    // No need for this when we have import/no-unresolved, in fact causes problems for typescript
    // 'import/extensions': ['error', 'ignorePackages'],
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     optionalDependencies: false,
    //     peerDependencies: false,
    //   },
    // ],
    // 'import/order': [
    //   'error',
    //   {
    //     alphabetize: {
    //       order: 'asc',
    //     },
    //   },
    // ],
    // 'import/no-unresolved': 'error',
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
    '@lewisl9029/react-hooks-for-react-anonymous/rules-of-hooks': 'error',
    '@lewisl9029/react-hooks-for-react-anonymous/exhaustive-deps': [
      'error',
      {
        additionalHooks: '(.*useCallback|.*useEffect)',
      },
    ],
  },
})

// const eslintConfigWithImportmap = ({ config, root, importmapPath }) => {
//   return {
//     ...config,
//     // rules: {
//     //   ...config.rules,
//     //   'import/no-unresolved': [
//     //     'error',
//     //     {
//     //       ignore: [
//     //         ...config.rules['import/no-unresolved']?.[1]?.ignore,
//     //         ...Object.entries(imports)
//     //           .filter(([_from, to]) => to.startsWith('https://'))
//     //           .map(([from, _to]) => from),
//     //       ],
//     //     },
//     //   ],
//     // },
//     settings: {
//       ...config.settings,
//       'import/resolver': {
//         [path_.resolve(__dirname, './eslint-import-resolver-web.cjs')]: {
//           rootPath: root,
//           importmapPath: importmapPath,
//         },
//       },
//     },
//   }
// }

const babelConfig = {
  parserOpts: { plugins: ['importAssertions'] },
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-syntax-top-level-await',
    '@babel/plugin-syntax-jsx',
  ],
}

const prettierConfig = {
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'lf',
  // for import assertion support. not working since babel parser doesn't use plugins
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'],
  //     options: {
  //       parser: 'babel',
  //     },
  //   },
  // ],
}

module.exports = {
  environments,
  eslintConfig,
  // eslintConfigWithImportmap,
  babelConfig,
  prettierConfig,
}
