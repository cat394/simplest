import {property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SBase} from './s-base';

const {styles} = CUSTOM_ELEMENT_SETTINGS.layoutItem;
const {alignSelf, order} = styles;

export class SLayoutItem extends SBase {
  @property(setConverter(alignSelf))
  alignSelf = '';

  @property(setConverter(order))
  order = '';

  getLayoutItemStyles(): string {
    return (
      super.getBaseStyles() + super.combineStyles([this.alignSelf, this.order])
    );
  }

  protected override render(): unknown {
    const styles = this.getLayoutItemStyles();
    return super.generateHTML(styles);
  }
}
