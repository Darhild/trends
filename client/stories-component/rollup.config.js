import path from 'path'

import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcssUrl from 'postcss-url'


import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [
    peerDepsExternal(),
    typescript({
      typescript: require('typescript'),
    }),
    terser(),
    postcss({
      extensions: ['.css'],
      plugins: [
        postcssUrl({
          url: 'inline',
          basePath: path.resolve(__dirname, 'src')
        })
      ],
      minimize: true,
      extract: pkg.style,
    }),
  ],
}
