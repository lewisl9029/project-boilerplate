import * as hi from './hi.js'
import * as _hiTsx from './hiTsx.js'
import * as _nested from '/nested/nested.js'
// TODO: report as bug in typescript module resolution?
import * as _styles from './styles.css' assert { type: 'css' }

export const hi2 = hi
