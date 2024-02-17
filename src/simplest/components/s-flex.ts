import {customElement, property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SLayoutBox} from './s-layout-box';

const {tagName, styles} = CUSTOM_ELEMENT_SETTINGS.flex;
const {flexDirection, flexWrap, flexFlow} = styles;

@customElement(tagName)
export class SFlex extends SLayoutBox {
  @property(setConverter(flexDirection))
  flexDirection = '';

  @property(setConverter(flexWrap))
  flexWrap = '';

  @property(setConverter(flexFlow))
  flexFlow = '';

  getFlexStyles(): string {
    return (
      super.getLayoutBoxStyles() +
      super.addDefaultStyles({display: 'flex'}) +
      super.combineStyles([this.flexDirection, this.flexWrap, this.flexFlow])
    );
  }

  protected override render(): unknown {
    const styles = this.getFlexStyles();
    return super.generateHTML(styles);
  }
}
