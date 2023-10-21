import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import 'dotenv/config';

const ENVIRONMENT_VARIABLES = {
  'process.env.PORT': JSON.stringify(process.env.PORT),
  'process.env.DB_URI': JSON.stringify(process.env.DB_URI),
  'process.env.JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
  'process.env.ALLOWED_ORIGINS': JSON.stringify(process.env.ALLOWED_ORIGINS),
};

export default {
  input: 'src/app.js',
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    json(),
    terser(),
    replace({
      preventAssignment: true,
      ...ENVIRONMENT_VARIABLES,
    }),
  ],
  output: {
    dir: 'dist',
    entryFileNames: 'api.bundle.cjs',
    format: 'cjs',
  },
};
