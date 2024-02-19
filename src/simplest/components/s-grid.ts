import {customElement, property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SLayoutBox} from './s-layout-box';

const {tagName, styles} = CUSTOM_ELEMENT_SETTINGS.grid;
const {
  justifyItems,
  placeItems,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridAutoColumns,
  gridAutoRows,
  gridAutoFlow,
} = styles;

@customElement(tagName)
export class SGrid extends SLayoutBox {
  @property(setConverter(justifyItems))
  justifyItems = '';

  @property(setConverter(placeItems))
  placeItems = '';

  @property(setConverter(gridTemplateColumns))
  gridTemplateColumns = '';

  @property(setConverter(gridTemplateRows))
  gridTemplateRows = '';

  @property(setConverter(gridTemplateAreas))
  gridTemplateAreas = '';

  @property(setConverter(gridAutoColumns))
  gridAutoColumns = '';

  @property(setConverter(gridAutoRows))
  gridAutoRows = '';

  @property(setConverter(gridAutoFlow))
  gridAutoFlow = '';

  getGridStyles(): string {
    return (
      super.getLayoutBoxStyles() +
      super.addDefaultStyles({display: 'grid'}) +
      super.combineStyles([
        this.justifyItems,
        this.placeItems,
        this.gridTemplateColumns,
        this.gridTemplateRows,
        this.gridTemplateAreas,
        this.gridAutoColumns,
        this.gridAutoRows,
        this.gridAutoFlow,
      ])
    );
  }

  protected override render(): unknown {
    const styles = this.getGridStyles();
    return super.generateHTML(styles);
  }
}
