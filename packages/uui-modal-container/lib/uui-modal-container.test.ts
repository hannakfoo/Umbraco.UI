import { html, fixture, expect } from '@open-wc/testing';
import { UUIModalContainerElement } from './uui-modal-container.element';

describe('UUIModalContainerElement', () => {
  let element: UUIModalContainerElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-modal-container></uui-modal-container> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalContainerElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});