import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html } from 'lit';
import { UUIModalElement } from '@umbraco-ui/uui-modal/lib';

/**
 * @element uui-modal-dialog
 */
@defineElement('uui-modal-dialog')
export class UUIModalDialogElement extends UUIModalElement {
  static styles = [
    ...UUIModalElement.styles,
    css`
      :host([closing]),
      :host([closing]) dialog {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    `,
  ];

  renderContent() {
    return html`<div><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-dialog': UUIModalDialogElement;
  }
}
