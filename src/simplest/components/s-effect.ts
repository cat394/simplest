import {customElement, property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SBase} from './s-base';

const {tagName, styles} = CUSTOM_ELEMENT_SETTINGS.effect;
const {opacity, filter, backdropFilter, mixBlendMode, clipPath} = styles;

@customElement(tagName)
export class SEffect extends SBase {
  @property(setConverter(opacity))
  opacity = '';

  @property(setConverter(filter))
  filter = '';

  @property(setConverter(backdropFilter))
  backdropFilter = '';

  @property(setConverter(mixBlendMode))
  mixBlendMode = '';

  @property(setConverter(clipPath))
  clipPath = '';

  getEffectStyles(): string {
    return (
      super.getBaseStyles() +
      super.addDefaultStyles({height: '100%'}) +
      super.combineStyles([
        this.opacity,
        this.filter,
        this.backdropFilter,
        this.mixBlendMode,
        this.clipPath,
      ])
    );
  }

  protected override render(): unknown {
    const styles = this.getEffectStyles();
    return super.generateHTML(styles);
  }
}
