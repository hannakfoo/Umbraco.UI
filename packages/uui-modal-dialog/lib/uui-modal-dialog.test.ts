import { html, fixture, expect } from '@open-wc/testing';
import { UUIModalDialogElement } from './uui-modal-dialog.element';

describe('UUIModalDialogElement', () => {
  let element: UUIModalDialogElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-modal-dialog></uui-modal-dialog> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIModalDialogElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});