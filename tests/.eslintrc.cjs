// TODO: convert to esm once eslint supports it.
// https://eslint.org/docs/user-guide/configuring#configuration-file-formats

const { eslintConfig } = require('../index.cjs')

module.exports = eslintConfig({ isRoot: true })
