import {property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SBox} from './s-box';

const {styles} = CUSTOM_ELEMENT_SETTINGS.layoutBox;
const {alignContent, alignItems, justifyContent, justifyItems, gap} = styles;

export class SLayoutBox extends SBox {
  @property(setConverter(alignContent))
  alignContent = '';

  @property(setConverter(alignItems))
  alignItems = '';

  @property(setConverter(justifyContent))
  justifyContent = '';

  @property(setConverter(justifyItems))
  justifyItems = '';

  @property(setConverter(gap))
  gap = '';

  getLayoutBoxStyles(): string {
    return (
      super.getBaseBoxStyles() +
      super.combineStyles([
        this.alignContent,
        this.alignItems,
        this.justifyContent,
        this.justifyItems,
        this.gap,
      ])
    );
  }

  protected override render(): unknown {
    const styles = this.getLayoutBoxStyles();
    return super.generateHTML(styles);
  }
}
