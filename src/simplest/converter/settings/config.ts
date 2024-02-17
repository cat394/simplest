import {escapeRegex} from './functions';

export type PropName = (typeof PROP_NAMES)[number];

export type BlockName = keyof typeof MARKERS.BLOCK_START;

export type BlockMarker = (typeof MARKERS.BLOCK_START)[BlockName];

export type CustomElementName = (typeof KINDS_OF_CUSTOM_ELEMENT)[number];

export type SimpleFunctionName = 'trans';

export const SIMPLEST_PREFIX = 's';

export const MARKERS = {
  BLOCK_SEPARATOR: '::',
  SIMPLE_SEPARATOR: ' ',
  SIMPLE_END: ';',
  PAIR: '=',
  MULTIPLE_LINKER: '_',
  BLOCK_START: {
    QUERY: '@',
    STATE: '!',
    STYLE: '',
  },
  EXPRESSION: {
    START: '(',
    END: ')',
  },
  CHAIN: '|',
  SIMPLE_AREA: {
    START: '[',
    END: ']',
    ARGS_SEPARATOR: ',',
  },
  IGNORE_AREA: {
    START: '{',
    END: '}',
  },
} as const;

export const BLOCK_NAMES = Object.keys(MARKERS.BLOCK_START) as [BlockName];

export const ESCAPED_MARKERS = {
  ESCAPED_EXPRESSION: {
    START: escapeRegex(MARKERS.EXPRESSION.START),
    END: escapeRegex(MARKERS.EXPRESSION.END),
  },
  ESCAPED_IGNORE_AREA: {
    START: escapeRegex(MARKERS.IGNORE_AREA.START),
    END: escapeRegex(MARKERS.IGNORE_AREA.END),
  },
  ESCAPED_SIMPLE_AREA: {
    START: escapeRegex(MARKERS.SIMPLE_AREA.START),
    END: escapeRegex(MARKERS.SIMPLE_AREA.END),
  },
};

export const PROP_NAMES = [
  // base
  'outline',
  'display',

  // text
  'color',
  'fontSize',
  'fontWeight',
  'fontFamily',
  'fontStyle',
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

  // bg
  'backgroundColor',
  'backgroundImage',
  'backgroundRepeat',
  'backgroundPosition',
  'backgroundAttachment',
  'backgroundBlendMode',
  'backgroundClip',
  'backgroundSize',

  // box
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
  'boxSizing',
  'boxShadow',
  'overflow',
  'zIndex',
  'aspectRatio',

  // layoutBox
  'alignContent',
  'alignItems',
  'justifyContent',
  'justifyItems',
  'placeContent',
  'placeItems',
  'gap',

  // layoutItem
  'alignSelf',
  'order',

  // flex
  'flexDirection',
  'flexWrap',
  'flexFlow',

  // flexItem
  'flexGrow',
  'flexShrink',
  'flexBasis',

  // grid
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridTemplateAreas',
  'gridAutoColumns',
  'gridAutoRows',
  'gridAutoFlow',

  // gridItem
  'justifySelf',
  'gridColumn',
  'gridRow',
  'gridArea',

  // effect
  'filter',
  'backdropFilter',
  'opacity',
  'blendMode',
  'clipPath',
] as const;

export const KINDS_OF_CUSTOM_ELEMENT = [
  // Base instance
  'base',
  'layoutBox',
  'layoutItem',

  // Custom elements
  'text',
  'bg',
  'box',
  'flex',
  'flexItem',
  'grid',
  'gridItem',
  'effect',
] as const;
