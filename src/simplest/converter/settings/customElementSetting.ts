import {transformSetting, OptionsTransformer} from './transformSetting';
import {SIMPLEST_PREFIX, PropName, CustomElementName} from './config';
import {PROP_SETTINGS, TransformedPropSettings} from './prop';
import {toKebabCase} from '../../utils';
import {pickProps} from './functions';

type InitialCustomElementOptions = {
  styles: PropName[];
};

type CustomElementSettings = Record<
  CustomElementName,
  InitialCustomElementOptions
>;

type TransformedCustomElementOptions = {
  tagName: string;
  styles: TransformedPropSettings;
};

const customElementSettings: CustomElementSettings = {
  base: {
    styles: ['outline', 'display'],
  },
  box: {
    styles: [
      'width',
      'height',
      'inlineSize',
      'blockSize',
      'padding',
      'margin',
      'border',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'inset',
      'boxShadow',
      'boxSizing',
      'overflow',
      'zIndex',
      'aspectRatio',
      'resize',
    ],
  },
  layoutBox: {
    styles: ['alignContent', 'alignItems', 'justifyContent', 'placeContent', 'gap'],
  },
  layoutItem: {
    styles: ['alignSelf', 'order'],
  },
  flex: {
    styles: ['flexDirection', 'flexWrap', 'flexFlow'],
  },
  flexItem: {
    styles: ['flexGrow', 'flexShrink', 'flexBasis'],
  },
  grid: {
    styles: [
      'justifyItems',
      'gridTemplateColumns',
      'gridTemplateRows',
      'gridTemplateAreas',
      'gridAutoColumns',
      'gridAutoRows',
      'gridAutoFlow',
    ],
  },
  gridItem: {
    styles: ['justifySelf', 'placeSelf', 'gridColumn', 'gridRow', 'gridArea'],
  },
  text: {
    styles: [
      'color',
      'fontSize',
      'fontWeight',
      'fontStyle',
      'fontFamily',
      'lineHeight',
      'textDecoration',
      'textTransform',
      'textShadow',
      'textAlign',
      'letterSpacing',
      'wordSpacing',
      'writingMode',
      'wordBreak',
      'verticalAlign',
    ],
  },
  bg: {
    styles: [
      'backgroundColor',
      'backgroundImage',
      'backgroundRepeat',
      'backgroundPosition',
      'backgroundAttachment',
      'backgroundBlendMode',
      'backgroundClip',
      'backgroundSize',
    ],
  },
  effect: {
    styles: ['opacity', 'filter', 'backdropFilter', 'mixBlendMode', 'clipPath'],
  },
};

const transformOptions: OptionsTransformer<
  CustomElementName,
  InitialCustomElementOptions,
  TransformedCustomElementOptions
> = (
  customElementName: CustomElementName,
  options: InitialCustomElementOptions
): TransformedCustomElementOptions => {
  const tagName = SIMPLEST_PREFIX + '-' + toKebabCase(customElementName);
  return {
    ...options,
    tagName,
    styles: pickProps(PROP_SETTINGS)(options.styles),
  };
};

export const CUSTOM_ELEMENT_SETTINGS = transformSetting<
  CustomElementName,
  InitialCustomElementOptions,
  TransformedCustomElementOptions
>(customElementSettings)(transformOptions);
