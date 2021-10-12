#!/usr/bin/env node
/* eslint-env node */
import * as fs_ from 'fs'
import * as path_ from 'path'

const args = process.argv.slice(2)

const root = args[0]
const importmapPath = args[1]

const importmap = JSON.parse(
  fs_.readFileSync(path_.resolve(root, importmapPath)),
)

const content = JSON.stringify(
  {
    compilerOptions: {
      baseUrl: root,
      paths: Object.fromEntries([
        ...[['/*', ['./*']]],
        ...Object.entries(importmap.imports)
          .filter(([from, _to]) => from.endsWith('/'))
          .map(([from, to]) => [
            `${from}*`,
            [to.startsWith('/') ? `.${to}*` : to],
          ]),
      ]),
    },
  },
  null,
  2,
)

fs_.writeFileSync('jsconfig.json', content)
