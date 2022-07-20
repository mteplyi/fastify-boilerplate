export const snakeCase = (str: string, lowerCase?: boolean): string => {
  const snaked = str.match(/[A-Z](?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g)?.join('_');

  if (!snaked) {
    return '';
  }

  return lowerCase ? snaked.toLowerCase() : snaked.toUpperCase();
};
