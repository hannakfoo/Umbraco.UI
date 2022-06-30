import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
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

  @property({ type: String })
  headline = '';

  renderContent() {
    return html` <uui-dialog>
      <uui-dialog-layout headline=${this.headline}>
        <slot></slot>
        <uui-button @click=${this.close} label="close" look="secondary"
          >Close</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-dialog': UUIModalDialogElement;
  }
}
