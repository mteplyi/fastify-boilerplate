import type { JSONSchema } from 'json-schema-to-ts';

import { mapObject } from 'src/util/general';

export const getEnumSchema = <TEnumValue>(enumObject: Record<any, TEnumValue>) =>
  ({ type: 'string', enum: Object.values<TEnumValue>(enumObject) } as const);

export type TraverseJsonSchemaReturnType<TValue> = TValue | { [k: string]: TraverseJsonSchemaReturnType<TValue> };

export const traverseSchema = <TValue>(
  schema: JSONSchema,
  callback: (required: boolean) => TValue,
  required = true,
): TraverseJsonSchemaReturnType<TValue> => {
  if (typeof schema !== 'object' || schema.type !== 'object' || !schema.properties) {
    return callback(required);
  }

  return mapObject(schema.properties, ([key, value]) => {
    const valueRequired = required && schema.required?.includes(key);
    return traverseSchema(value, callback, valueRequired);
  });
};
