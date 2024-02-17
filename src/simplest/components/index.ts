import {SText} from './s-text';
import {SBg} from './s-bg';
import {SBox} from './s-box';
import {SFlex} from './s-flex';
import {SGrid} from './s-grid';
import {SFlexItem} from './s-flex-item';
import {SGridItem} from './s-grid-item';
import {SEffect} from './s-effect';

export {SText, SBg, SBox, SFlex, SGrid, SFlexItem, SGridItem, SEffect};

declare global {
  interface HTMLElementTagNameMap {
    's-text': SText;
    's-bg': SBg;
    's-box': SBox;
    's-flex': SFlex;
    's-grid': SGrid;
    's-flex-item': SFlexItem;
    's-grid-item': SGridItem;
    's-effect': SEffect;
  }
}
