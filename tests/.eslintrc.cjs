// TODO: convert to esm once eslint supports it.
// https://eslint.org/docs/user-guide/configuring#configuration-file-formats

const { eslintConfig, eslintConfigWithImportmap } = require('../index.cjs')

module.exports = eslintConfigWithImportmap({
  config: eslintConfig({ isRoot: true }),
  importmapPath: './web.importmap',
  root: __dirname,
})
