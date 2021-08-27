// TODO: convert to esm once eslint supports it.
// https://eslint.org/docs/user-guide/configuring#configuration-file-formats

const { eslintConfig, environments } = require('../../index.cjs')

module.exports = eslintConfig({
  isRoot: true,
  environment: environments.deno,
})
