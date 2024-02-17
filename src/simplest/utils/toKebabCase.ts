export const toKebabCase = (target: string) => {
  return target.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};