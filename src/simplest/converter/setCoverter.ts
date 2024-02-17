import {PropertyDeclaration} from 'lit';
import {TransformedPropOptions} from './settings/prop';
import {simplestConverter} from './converter';

type PropertyDeclarationOptions =
  | PropertyDeclaration<unknown, unknown>
  | undefined;

export const setConverter = (
  propOptions: TransformedPropOptions
): PropertyDeclarationOptions => {
  return {
    converter: simplestConverter(propOptions),
    attribute: 'data-' + propOptions.attrName,
  };
};
