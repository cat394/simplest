import {customElement, property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SLayoutItem} from './s-layout-item';

const {tagName, styles} = CUSTOM_ELEMENT_SETTINGS.flexItem;
const {flexGrow, flexShrink, flexBasis} = styles;

@customElement(tagName)
export class SFlexItem extends SLayoutItem {
  @property(setConverter(flexGrow))
  flexGrow = '';

  @property(setConverter(flexShrink))
  flexShrink = '';

  @property(setConverter(flexBasis))
  flexBasis = '';

  getFlexItemStyles(): string {
    return (
      super.getLayoutItemStyles() +
      super.combineStyles([this.flexGrow, this.flexShrink, this.flexBasis])
    );
  }

  protected override render(): unknown {
    const styles = this.getFlexItemStyles();
    return super.generateHTML(styles);
  }
}
