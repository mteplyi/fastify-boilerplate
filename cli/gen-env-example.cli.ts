import '../src/bootstrap';

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { getEnvFlatten } from 'src/config/config';
import { configKeyDelimiter } from 'src/config/constants';
import { defaultConfig } from 'src/config/default';
import { configSchema } from 'src/config/schema';
import { mapObject } from 'src/util/general';
import { traverseSchema } from 'src/util/json-schema';

const fileName = process.argv[2];

if (!fileName) {
  throw new Error('File name is not specified');
}

const requiredSymbol = Symbol('required');
const optionalSymbol = Symbol('optional');
type ConfigPatternValueSymbol = typeof requiredSymbol | typeof optionalSymbol;

const configPattern = traverseSchema(
  configSchema,
  (required): ConfigPatternValueSymbol => (required ? requiredSymbol : optionalSymbol),
) as Record<string, unknown>;

const flattenConfigPattern = getEnvFlatten<ConfigPatternValueSymbol>(configPattern);
const flattenDefaultConfig = getEnvFlatten(defaultConfig);

const envExampleData: EnvExampleData = mapObject(flattenConfigPattern, ([key, value]) => {
  const existsInDefault = key in flattenDefaultConfig;
  return {
    required: !existsInDefault && value === requiredSymbol,
    value: existsInDefault ? flattenDefaultConfig[key] : '',
  };
});

type EnvExampleData = Record<string, { required: boolean; value: unknown }>;
const generateEnvExampleFile = (data: EnvExampleData): string => {
  const commentPart = '#';

  return Object.entries(data)
    .reduce<string[]>((lines, [key, { required, value }]) => {
      const previousLine = lines.at(-1);

      if (previousLine) {
        const keyParts = key.split(configKeyDelimiter);

        if (!previousLine.startsWith(keyParts[0]) && !previousLine.startsWith(`${commentPart}${keyParts[0]}`)) {
          lines.push('\n');
        }
      }

      const preparedValue = typeof value === 'string' ? value : JSON.stringify(value);

      lines.push(`${required ? '' : commentPart}${key}=${preparedValue}\n`);

      return lines;
    }, [])
    .join('');
};

const envPath = resolve(__dirname, '..', fileName);
const envFile = generateEnvExampleFile(envExampleData);
writeFileSync(envPath, envFile);

// eslint-disable-next-line no-console
console.log(`${fileName} is generated.`);
