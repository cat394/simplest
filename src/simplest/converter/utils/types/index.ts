export type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export const neverReached = (never: never) => {
  throw new Error(never);
};
