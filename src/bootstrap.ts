/* eslint-disable import/no-import-module-exports */
import { resolve } from 'node:path';

import { register } from 'tsconfig-paths';

import { compilerOptions } from '../tsconfig.json';

const tsconfigPath = module.children.find((m) => m.id.endsWith('/tsconfig.json'))?.path;

if (!tsconfigPath) {
  throw new Error('Failed to load tsconfig.json');
}

const baseUrl = resolve(tsconfigPath, compilerOptions.baseUrl);

register({ baseUrl, paths: compilerOptions.paths });
