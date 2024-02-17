import {customElement, property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SBase} from './s-base';

const {tagName, styles} = CUSTOM_ELEMENT_SETTINGS.box;
const {
  width,
  height,
  inlineSize,
  blockSize,
  padding,
  margin,
  border,
  position,
  top,
  right,
  bottom,
  left,
  inset,
  boxSizing,
  boxShadow,
  overflow,
  zIndex,
  aspectRatio,
  resize
} = styles;

@customElement(tagName)
export class SBox extends SBase {
  @property(setConverter(width))
  width = '';

  @property(setConverter(height))
  height = '';

  @property(setConverter(inlineSize))
  inlineSize = '';

  @property(setConverter(blockSize))
  blockSize = '';

  @property(setConverter(padding))
  padding = '';

  @property(setConverter(margin))
  margin = '';

  @property(setConverter(border))
  border = '';

  @property(setConverter(position))
  position = '';

  @property(setConverter(top))
  top = '';

  @property(setConverter(right))
  right = '';

  @property(setConverter(bottom))
  bottom = '';

  @property(setConverter(left))
  left = '';

  @property(setConverter(inset))
  inset = '';

  @property(setConverter(boxSizing))
  boxSizing = '';

  @property(setConverter(boxShadow))
  boxShadow = '';

  @property(setConverter(overflow))
  overflow = '';

  @property(setConverter(zIndex))
  zIndex = '';

  @property(setConverter(aspectRatio))
  aspectRatio = '';

  @property(setConverter(resize))
  resize = '';

  getBaseBoxStyles(): string {
    return (
      super.getBaseStyles() +
      super.addDefaultStyles({boxSizing: 'border-box'}) +
      super.combineStyles([
        this.display,
        this.width,
        this.height,
        this.padding,
        this.margin,
        this.border,
        this.position,
        this.top,
        this.right,
        this.bottom,
        this.left,
        this.inset,
        this.boxSizing,
        this.boxShadow,
        this.overflow,
        this.zIndex,
        this.aspectRatio
      ])
    );
  }

  protected override render(): unknown {
    const styles =
      super.addDefaultStyles({display: 'block'}) +
      super.getBaseStyles() +
      this.getBaseBoxStyles();
    return super.generateHTML(styles);
  }
}
