const babelConfig = require('./index.cjs').babelConfig

module.exports = (api) => {
  api.cache(true)
  return babelConfig
}
