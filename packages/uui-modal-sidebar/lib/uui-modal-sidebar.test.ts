import { html, fixture, expect } from '@open-wc/testing';
import { UUIModalSidebarElement } from './uui-modal-sidebar.element';

describe('UUIModalSidebarElement', () => {
  let element: UUIModalSidebarElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-modal-sidebar></uui-modal-sidebar> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalSidebarElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});