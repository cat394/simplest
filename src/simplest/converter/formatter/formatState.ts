import {MARKERS} from '../settings/config';

const {CHAIN} = MARKERS;

export const formatState = (blockValue: string) => {
  return blockValue
    .split(CHAIN)
    .map((stateName) => `:host(:${stateName})`)
    .join(', ');
};
