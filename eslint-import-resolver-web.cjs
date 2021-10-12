// TODO: publish as package
const fs_ = require('fs')
const path_ = require('path')

exports.interfaceVersion = 2

exports.resolve = (source, file, config) => {
  const imports = JSON.parse(
    fs_.readFileSync(path_.resolve(config.rootPath, config.importmapPath)),
  ).imports

  // Don't try to resolve external urls to disk paths, assume they resolve
  if (source.startsWith('https://')) {
    return { found: true, path: null }
  }

  const importmapExactMatch = imports[source]

  if (importmapExactMatch) {
    // Don't try to resolve external urls to disk paths, assume they resolve
    if (importmapExactMatch.startsWith('https://')) {
      return { found: true, path: null }
    }

    // TODO: cache to avoid checking same files?
    if (fs_.existsSync(path_.join(config.rootPath, importmapExactMatch))) {
      return {
        found: true,
        // If we return the real path, eslint-plugin-import will try to confirm case match
        // even though the entire file name could be different...
        path: null,
      }
    }

    return {
      found: false,
    }
  }

  const importmapMatch = Object.entries(imports).find(
    ([key]) => key.endsWith('/') && source.startsWith(key),
  )?.[1]

  if (importmapMatch) {
    // Don't try to resolve external urls to disk paths, assume they resolve
    if (importmapMatch.startsWith('https://')) {
      return { found: true, path: null }
    }

    // TODO: cache to avoid checking same files? how to enable only for cli runs to prevent stale editor integration?
    if (fs_.existsSync(path_.join(config.rootPath, importmapMatch))) {
      return {
        found: true,
        // If we return the real path, eslint-plugin-import will try to confirm case match
        // even though the entire file name could be different...
        path: null,
      }
    }

    return {
      found: false,
    }
  }

  // Resolve web-standard absolute url imports of the form '/blah.js'
  if (source.startsWith('/')) {
    const path = path_.join(config.rootPath, source)
    if (fs_.existsSync(path)) {
      return { found: true, path }
    }

    return {
      found: false,
    }
  }

  return { found: false }
}
