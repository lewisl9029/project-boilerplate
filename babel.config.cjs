module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-syntax-import-meta'],
  }
}
