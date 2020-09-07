// TODO: convert to esm once eslint supports it.
// https://eslint.org/docs/user-guide/configuring#configuration-file-formats
module.exports = require('./index.cjs').config({ environment: 'node' })
