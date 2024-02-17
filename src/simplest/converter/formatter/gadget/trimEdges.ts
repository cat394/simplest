export const trimEdges =
  (str: string) =>
  (startIndex: number) =>
  (lastIndex: number) => {
    return str.slice(startIndex, -lastIndex);
  };
