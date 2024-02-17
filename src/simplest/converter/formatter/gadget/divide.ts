import {isIndexFound} from './checker';

export const divide =
  <Before extends string = string, After extends string | null = string>(
    target: string
  ) =>
  (index: number): [Before, After] => {
    let before = target;
    let after: string | null = null;

    if (isIndexFound(index)) {
      before = target.slice(0, index);
      after = target.slice(index);
    }

    return [before, after] as [Before, After];
  };
