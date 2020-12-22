#!/usr/bin/env node

import * as fs from 'fs'

const args = process.argv.slice(2)

const importmapPath = args[0]

const root = args[1]

const importmap = JSON.parse(fs.readFileSync(importmapPath))

const content = JSON.stringify(
  {
    compilerOptions: {
      baseUrl: root,
      paths: Object.fromEntries(
        Object.entries(importmap.imports)
          .filter(([from, to]) => from.endsWith('/'))
          .map(([from, to]) => [
            `${from}*`,
            [to.startsWith('/') ? `.${to}*` : to],
          ]),
      ),
    },
  },
  null,
  2,
)

fs.writeFileSync('jsconfig.json', content)
