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

  private _onModalOpen(event: Event) {
    const modal = event.target as UUIModalElement;
    const index = this.modals!.indexOf(modal);
    if (index === 0) {
      modal.showBackdrop();
    }
  }

  private _onModalClose(event: Event) {
    const modal = event.target as UUIModalElement;
    modal?.toggleAttribute('backdrop', false);
    this._onSlotChange(event);
  }

  private _onSlotChange(event: Event): void {
    if (!this.modals) return;

    this.modals[0]?.toggleAttribute('backdrop', true);

    this.modals.forEach((modal, index) => {
      if (index === this.modals!.length - 1) {
        modal.toggleAttribute('fade', false);
      } else {
        modal.toggleAttribute('fade', true);
      }
    });
  }

  render() {
    return html`<slot @slotchange=${this._onSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-container': UUIModalContainerElement;
  }
}
