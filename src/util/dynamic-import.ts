type ImportDynamic = <TModule>(modulePath: string) => Promise<TModule>;

export const importDynamic =
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  new Function('modulePath', 'return import(modulePath)') as ImportDynamic;
