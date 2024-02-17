import {TransformedPropOptions} from '../settings/prop';
import {formatSimpleArea} from './formatSimpleArea';
import {MARKERS} from '../settings/config';
import {SimpleNode} from '../node';
import {divide} from './gadget';

const {CHAIN, SIMPLE_AREA, PAIR} = MARKERS;

export const formatStyle = (
  blockValue: SimpleNode['value'],
  propSetting: TransformedPropOptions
): string => {
  const {postfixed, styleName} = propSetting;

  const styles = blockValue.split(CHAIN);

  return styles.reduce((acc, style) => {
    let propertyName = '';
    let propertyValue = '';

    const simpleAreaStartIndex = style.indexOf(SIMPLE_AREA.START);
    const [styleArea, simpleArea] = divide(style)(simpleAreaStartIndex);

    if (styleArea.includes(PAIR)) {
      const [styleKey, styleValue] = styleArea.split(PAIR);

      postfixed
        ? (propertyName = `${styleKey.trim()}-${styleName}`)
        : (propertyName = `${styleName}-${styleKey.trim()}`);

      propertyValue = styleValue;
    } else {
      propertyName = styleName;
      propertyValue = styleArea;
    }

    const simpleAreaStyles = formatSimpleArea(simpleArea)(propertyName);

    return (acc += (styleArea ? `${propertyName}:${propertyValue.trim()}; ` : '') + simpleAreaStyles);
  }, '');
};
