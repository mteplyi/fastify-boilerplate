export const mapObject = <TKey extends string, TValue, TReturn>(
  obj: { [k in TKey]: TValue },
  callback: (entry: [key: TKey, value: TValue], index: number) => TReturn,
) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]: [TKey, TValue], index) => {
      return [key, callback([key, value], index)];
    }),
  ) as { [k in TKey]: TReturn };
};
