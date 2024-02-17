import {MARKERS, SimpleFunctionName} from '../settings/config';
import {divide, trimEdges} from './gadget';
import {isFirstItem, isLastItem} from './gadget/checker';
import {neverReached} from '../utils/types';

const {SIMPLE_AREA, EXPRESSION} = MARKERS;

export const formatSimpleArea =
  (simpleArea: string | null) => (propertyName: string) => {
    if (!simpleArea) return '';
    const simpleFunction = trimEdges(simpleArea)(SIMPLE_AREA.START.length)(
      SIMPLE_AREA.END.length
    );
    const argsAreaStart = simpleFunction.indexOf(EXPRESSION.START);
    const [simpleFunctionName, argsArea] =
      divide<SimpleFunctionName>(simpleFunction)(argsAreaStart);

    if (!argsArea) return '';

    const args = trimEdges(argsArea)(SIMPLE_AREA.START.length)(
      SIMPLE_AREA.END.length
    ).split(SIMPLE_AREA.ARGS_SEPARATOR);

    const reduceTransitionCSS = (
      acc: string,
      arg: string,
      currentIndex: number,
      args: string[]
    ) => {
      if (isFirstItem(currentIndex)) {
        acc += propertyName;
      }
      acc += ' ' + arg;
      if (isLastItem(currentIndex)(args)) {
        acc += ';';
      }
      return acc;
    };

    switch (simpleFunctionName) {
      case 'trans':
        return args.reduce(reduceTransitionCSS, 'transition:');
      default:
        return neverReached(simpleFunctionName);
    }
  };
