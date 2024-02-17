import {html, TemplateResult} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { CustomElementName, KINDS_OF_CUSTOM_ELEMENT, PropName } from '../../simplest/converter/settings/config';

type TestAttributeValues = Record<PropName | keyof CSSStyleDeclaration, string[]>;

const testAttributeValues: TestAttributeValues = {
  display: ['block', 'inline'],
  width: ['2rem', '5px'],
  marginBlock: [],
};

const createDynamicElementHTML = (
  tagName: CustomElementName,
  propName: PropName,
  value: string
): string => {
  const element = document.createElement(tagName);
  element.setAttribute(`s-${propName}`, value);
  return element.outerHTML;
};

type TestCase = [string, TemplateResult];

type AttributeTest = {
  [elementName in CustomElementName]: {
    [propName in PropName]: {
      testCases: TestCase[];
    };
  };
};

const tests = KINDS_OF_CUSTOM_ELEMENT.reduce(
  (acc, elementName) => {
    const propNames = Object.keys(testAttributeValues) as PropName[];
    acc[elementName] = propNames.reduce(
      (propAcc, propName) => {
        const testCases = testAttributeValues[propName].map((value) => {
          const elementHTML = createDynamicElementHTML(
            elementName,
            propName,
            value
          );
          return [value, html`${unsafeHTML(elementHTML)}`] as TestCase;
        });

        propAcc[propName] = {testCases};
        return propAcc;
      },
      {} as Record<PropName, {testCases: TestCase[]}> 
    );

    return acc;
  },
  {} as AttributeTest
);