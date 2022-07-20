export type PartiallyNullable<T> = {
  [K in keyof T]: T[K] | null;
};

export const isStaticType = <T>(value: T): value is T => true;
