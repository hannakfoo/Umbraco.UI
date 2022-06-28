import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { queryAll, queryAssignedElements } from 'lit/decorators.js';
import { UUIModalElement } from '@umbraco-ui/uui-modal/lib';

/**
 * @element uui-modal-container
 */
@defineElement('uui-modal-container')
export class UUIModalContainerElement extends LitElement {
  static styles = [
    css`
      :host {
      }
    `,
  ];

  @queryAssignedElements({
    selector: 'uui-modal:not(.closing)',
    flatten: true,
  })
  modals?: UUIModalElement[];

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('open', this._onModalOpen);
    this.addEventListener('closing', this._onModalClose);
  }

  private _onModalOpen(event: Event): void {
    this.modals![this.modals!.length - 2]?.hide();
  }

  private _onModalClose(event: Event): void {
    this.modals![this.modals!.length - 1]?.show();
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-container': UUIModalContainerElement;
  }
}
