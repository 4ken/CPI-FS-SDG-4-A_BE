import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import 'dotenv/config';

const isProduction = process.env.ENVIRONMENT === 'production';
const environment = isProduction ? 'production' : 'development';

console.log('environment::::', environment);

let ENVIRONMENT_VARIABLES = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.PORT': JSON.stringify('3080'),
  'process.env.DB_URI': JSON.stringify(process.env.DB_URI),
  'process.env.JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
};

if (isProduction) {
  ENVIRONMENT_VARIABLES = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.PORT': JSON.stringify('80'),
    'process.env.DB_URI': JSON.stringify(
      'put your MongoDB connection string here'
    ),
    'process.env.JWT_SECRET': JSON.stringify('put your JWT secret key here'),
  };
}

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
