/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  SBox,
  SFlex,
  SGrid,
  SFlexItem,
  SGridItem,
  SBg,
  SText,
  SEffect,
} from '../../simplest/components';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import {toKebabCase} from '../../../simplest/utils';
import {SIMPLEST_PREFIX} from '../../../simplest/converter/settings/config';
import {TemplateResult} from 'lit';

suite('simplest custom elements', () => {
  const instances = {
    SBox,
    SFlex,
    SGrid,
    SFlexItem,
    SGridItem,
    SBg,
    SText,
    SEffect,
  };

  const numberOfComponents = Object.entries(instances);

  const attributeTest =
    (attrName: string) =>
    (testHTML: TemplateResult) =>
    (componentInstanceName: string) =>
    (propertyName: keyof CSSStyleDeclaration) =>
    (propertyValue: string) => {
      test(`${SIMPLEST_PREFIX}-${attrName} attribute`, async () => {
        await fixture(testHTML);
        const element = document.querySelector(
          `${componentInstanceName}::part(test)`
        );
        if (element)
          assert.equal(getComputedStyle(element)[propertyName], propertyValue);
      });
    };

  numberOfComponents.forEach((component) => {
    const [componentInstanceName, componentInstance] = component;

    const componentName =
      SIMPLEST_PREFIX + toKebabCase(componentInstanceName).slice();
    test(`is defined ${componentName}`, () => {
      const element = document.createElement(componentName);
      assert.instanceOf(element, componentInstance);
    });
    test('rendering result', async () => {
      const element = await fixture(html`<s-box>Hello</s-box>`);
      if (componentInstanceName === 's-test') {
        assert.shadowDom.equal(
          element,
          `
            <style>
            </style>
            <span part><slot></slot></span>
          `
        );
      } else {
        assert.shadowDom.equal(
          element,
          `
            <style>
            </style>
            <div part><slot></slot></div>
          `
        );
      }
    });
    
  });
});
