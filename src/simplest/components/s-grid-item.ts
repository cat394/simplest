import {customElement, property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SLayoutItem} from './s-layout-item';

const {tagName, styles} = CUSTOM_ELEMENT_SETTINGS.gridItem;
const {justifySelf, gridColumn, gridRow, gridArea} = styles;

@customElement(tagName)
export class SGridItem extends SLayoutItem {
  @property(setConverter(justifySelf))
  justifySelf = '';

  @property(setConverter(gridColumn))
  gridColumn = '';

  @property(setConverter(gridRow))
  gridRow = '';

  @property(setConverter(gridArea))
  gridArea = '';

  getGridItemStyles(): string {
    return (
      super.getLayoutItemStyles() +
      super.combineStyles([
        this.justifySelf,
        this.gridColumn,
        this.gridRow,
        this.gridArea,
      ])
    );
  }

  protected override render(): unknown {
    const styles = this.getGridItemStyles();
    return super.generateHTML(styles);
  }
}
