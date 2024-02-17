import {customElement, property} from 'lit/decorators.js';
import {CUSTOM_ELEMENT_SETTINGS} from '../converter/settings/customElementSetting';
import {setConverter} from '../converter';
import {SBase} from './s-base';

const {tagName, styles} = CUSTOM_ELEMENT_SETTINGS.text;
const {
  color,
  fontSize,
  fontWeight,
  fontFamily,
  fontStyle,
  lineHeight,
  textDecoration,
  textTransform,
  textShadow,
  textAlign,
  letterSpacing,
  wordSpacing,
  writingMode,
  verticalAlign
} = styles;

@customElement(tagName)
export class SText extends SBase {
  @property(setConverter(color))
  color = '';

  @property(setConverter(fontSize))
  fontSize = '';

  @property(setConverter(fontWeight))
  fontWeight = '';

  @property(setConverter(fontFamily))
  fontFamily = '';

  @property(setConverter(fontStyle))
  fontStyle = '';

  @property(setConverter(lineHeight))
  lineHeight = '';

  @property(setConverter(textDecoration))
  textDecoration = '';

  @property(setConverter(textTransform))
  textTransform = '';

  @property(setConverter(textShadow))
  textShadow = '';

  @property(setConverter(textAlign))
  textAlign = '';

  @property(setConverter(letterSpacing))
  letterSpacing = '';

  @property(setConverter(wordSpacing))
  wordSpacing = '';

  @property(setConverter(writingMode))
  writingMode = '';

  @property(setConverter(verticalAlign))
  verticalAlign = '';

  getTextStyles(): string {
    return (
      super.getBaseStyles() +
      super.combineStyles([
        this.color,
        this.fontSize,
        this.fontWeight,
        this.fontFamily,
        this.fontStyle,
        this.lineHeight,
        this.textDecoration,
        this.textTransform,
        this.textShadow,
        this.textAlign,
        this.letterSpacing,
        this.wordSpacing,
        this.writingMode,
        this.verticalAlign
      ])
    );
  }

  protected override render(): unknown {
    const styles = this.getTextStyles();
    return super.generateHTML(styles);
  }
}
