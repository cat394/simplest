import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {PropName} from '../converter/settings/config';
import {setConverter} from '../converter';
import {toKebabCase} from '../utils';

const {styles} = CUSTOM_ELEMENT_SETTINGS.base;
const {outline, display} = styles;

export class SBase extends LitElement {
  @property(setConverter(display))
  display = '';

  @property(setConverter(outline))
  outline = '';

  combineStyles(styles: string[]) {
    return styles.join('');
  }

  private _createStyles<T extends string>(
    props: Partial<Record<T, string>>,
    CSSTransformer: (propName: T, propValue: string) => string
  ): string {
    let css = ':host{';
    const stylePairs = Object.entries(props) as [T, string][];
    stylePairs.forEach(([propName, propValue]) => {
      css += CSSTransformer(propName, propValue);
    });
    css += '}\n';
    return css;
  }

  addDefaultStyles(props: Partial<Record<PropName, string>>): string {
    return this._createStyles<PropName>(props, (propName, propValue) => {
      const thisPropValue = (this as any)[propName];
      return thisPropValue ? '' : `${toKebabCase(propName)}:${propValue}; `;
    });
  }

  addForcedStyles(props: Record<string, string>): string {
    return this._createStyles(props, (propName, propValue) => {
      return `${toKebabCase(propName)}:${propValue}; `;
    });
  }

  getBaseStyles() {
    return this.combineStyles([this.display, this.outline]);
  }

  generateHTML(styles: string) {
    return html`<style>
        ${styles}
      </style>
      <slot></slot>`;
  }
}
