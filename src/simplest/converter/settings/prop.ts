import {transformSetting, OptionsTransformer} from './transformSetting';
import {MakeRequired} from '../utils/types';
import {toKebabCase} from '../../utils';
import {PropName} from './config';

type InitialPropOptions = Partial<{
  attrName: string;
  postfixed: boolean;
}>;

type OptionsAddedWhenTransforming = {
  styleName: string;
};

type PropSettings = Record<PropName, InitialPropOptions>;

type RequiredOptionName = (typeof requiredOptions)[number];

type OptionsRequiredWhenTransforming = MakeRequired<
  InitialPropOptions,
  RequiredOptionName
>;

export type TransformedPropOptions = OptionsRequiredWhenTransforming &
  OptionsAddedWhenTransforming;

export type TransformedPropSettings = Record<PropName, TransformedPropOptions>;

const requiredOptions = ['attrName'] as const;

const propSettings: PropSettings = {
  // base
  outline: {},

  // text
  color: {},
  fontSize: {
    attrName: 'size',
  },
  fontWeight: {
    attrName: 'weight',
  },
  fontFamily: {
    attrName: 'family',
  },
  fontStyle: {
    attrName: 'style',
  },
  textDecoration: {
    attrName: 'decoration',
  },
  textTransform: {
    attrName: 'transform',
  },
  textShadow: {
    attrName: 'shadow',
  },
  textAlign: {
    attrName: 'align'
  },
  lineHeight: {},
  letterSpacing: {},
  wordSpacing: {},
  wordBreak: {},
  writingMode: {},
  verticalAlign: {},

  // bg
  backgroundColor: {
    attrName: 'color',
  },
  backgroundImage: {
    attrName: 'image',
  },
  backgroundRepeat: {
    attrName: 'repeat',
  },
  backgroundPosition: {
    attrName: 'position',
  },
  backgroundAttachment: {
    attrName: 'attachment'
  },
  backgroundBlendMode: {
    attrName: 'blend-mode'
  },
  backgroundClip: {
    attrName: 'clip',
  },
  backgroundSize: {
    attrName: 'size',
  },

  // box
  display: {},
  width: {
    postfixed: true,
  },
  height: {
    postfixed: true,
  },
  inlineSize: {
    postfixed: true,
  },
  blockSize: {
    postfixed: true,
  },
  padding: {},
  margin: {},
  border: {},
  position: {},
  top: {},
  right: {},
  bottom: {},
  left: {},
  inset: {},
  boxSizing: {
    attrName: 'sizing',
  },
  boxShadow: {
    attrName: 'shadow',
  },
  overflow: {},
  zIndex: {},
  aspectRatio: {},
  resize: {},

  // layoutBox
  alignContent: {},
  alignItems: {},
  justifyContent: {},
  justifyItems: {},
  placeContent: {},
  placeItems: {},
  gap: {
    postfixed: true,
  },

  // layoutItem
  alignSelf: {},
  order: {},

  // flex
  flexDirection: {
    attrName: 'direction',
  },
  flexWrap: {
    attrName: 'wrap',
  },
  flexFlow: {
    attrName: 'flow'
  },

  // flexItem
  flexGrow: {
    attrName: 'grow',
  },
  flexShrink: {
    attrName: 'shrink',
  },
  flexBasis: {
    attrName: 'basis',
  },

  // grid
  gridTemplateColumns: {
    attrName: 'columns',
  },
  gridTemplateRows: {
    attrName: 'rows',
  },
  gridTemplateAreas: {
    attrName: 'areas',
  },
  gridAutoColumns: {
    attrName: 'auto-columns',
  },
  gridAutoRows: {
    attrName: 'auto-rows',
  },
  gridAutoFlow: {
    attrName: 'auto-flow',
  },

  // gridItem
  justifySelf: {},
  gridColumn: {
    attrName: 'column',
  },
  gridRow: {
    attrName: 'row',
  },
  gridArea: {
    attrName: 'area',
  },

  // effect
  opacity: {},
  filter: {},
  backdropFilter: {},
  blendMode: {},
  clipPath: {},
};

const transformOptions: OptionsTransformer<
  PropName,
  InitialPropOptions,
  TransformedPropOptions
> = (propName: PropName, options: InitialPropOptions) => {
  const styleName = toKebabCase(propName);
  const attrName = options.attrName ?? styleName;
  return {
    ...options,
    attrName,
    styleName,
  };
};

export const PROP_SETTINGS = transformSetting<
  PropName,
  InitialPropOptions,
  TransformedPropOptions
>(propSettings)(transformOptions);
