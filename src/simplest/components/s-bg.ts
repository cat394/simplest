import {customElement, property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SBase} from './s-base';

const {tagName, styles} = CUSTOM_ELEMENT_SETTINGS.bg;
const {
  backgroundColor,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundAttachment,
  backgroundBlendMode,
  backgroundClip,
  backgroundSize,
} = styles;

@customElement(tagName)
export class SBg extends SBase {
  @property(setConverter(backgroundColor))
  backgroundColor = '';

  @property(setConverter(backgroundImage))
  backgroundImage = '';

  @property(setConverter(backgroundPosition))
  backgroundPosition = '';

  @property(setConverter(backgroundRepeat))
  backgroundRepeat = '';

  @property(setConverter(backgroundAttachment))
  backgroundAttachment = '';

  @property(setConverter(backgroundClip))
  backgroundClip = '';

  @property(setConverter(backgroundBlendMode))
  backgroundBlendMode = '';

  @property(setConverter(backgroundSize))
  backgroundSize = '';

  getBgStyles(): string {
    return (
      super.addDefaultStyles({display: 'block'}) +
      super.addForcedStyles({height: '100%'}) +
      super.combineStyles([
        this.backgroundColor,
        this.backgroundImage,
        this.backgroundPosition,
        this.backgroundRepeat,
        this.backgroundAttachment,
        this.backgroundBlendMode,
        this.backgroundClip,
        this.backgroundSize,
      ])
    );
  }

  protected override render(): unknown {
    const styles = super.getBaseStyles() + this.getBgStyles();
    return super.generateHTML(styles);
  }
}
