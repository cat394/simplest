export const pickProps = <
  Target extends Record<string, unknown>,
  Key extends keyof Target
>(
  target: Target,
) => (keys: Key[]): Pick<Target, Key> => {
  const pickedProps = {} as Pick<Target, Key>;
  keys.forEach((key) => (pickedProps[key] = target[key]));
  return pickedProps;
};