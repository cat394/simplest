import {ComplexAttributeConverter} from 'lit';
import {MARKERS} from './settings/config';
import {generateAST} from './generateAST';
import {generateCSS} from './generateCSS';
import {TransformedPropOptions} from './settings/prop';
import {formatExpression} from './formatter';
import {isEmpty} from './formatter/gadget/checker';

export type SimplestConverter = ComplexAttributeConverter<string>;

const {SIMPLE_END, SIMPLE_SEPARATOR, MULTIPLE_LINKER} = MARKERS;

export const simplestConverter = (
  propOptions: TransformedPropOptions
): SimplestConverter => {
  return {
    fromAttribute: (attrValue: string) => {
      let CSS = '';
      let simplest = '';
      simplest = attrValue.trim();
      if (!simplest) {
        throw new Error('Attribute value is empty.');
      }
      simplest = simplest.replace(/\s{2,}/g, SIMPLE_SEPARATOR);
      const simples = simplest.split(SIMPLE_SEPARATOR);
      if (isEmpty(simples)) {
        throw new Error(`Attribute value is only two more space.`);
      }
      simples.forEach((simple) => {
        if (!simple.endsWith(SIMPLE_END)) {
          throw new Error(
            `Forget last "${SIMPLE_END}".\nMistake place:${simplest}`
          );
        }
        simple = simple.slice(0, -SIMPLE_END.length);
        simple = simple.replaceAll(MULTIPLE_LINKER, ' ');
        simple = formatExpression(simple);
        const node = generateAST(simple);
        CSS += generateCSS(node)(propOptions) + '\n';
      });
      return CSS;
    },
  };
};
