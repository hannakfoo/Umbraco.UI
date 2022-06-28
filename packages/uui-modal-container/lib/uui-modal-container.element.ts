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

    this.addEventListener('closing', this._onClosing);
  }

  private _onClosing(e: Event) {
    if (!this.modals) return;
    this.modals[this.modals.length - 1]?.toggleAttribute('front', true);
  }

  private _onSlotChange(e: Event) {
    if (!this.modals) return;
    this.modals.forEach((modal, i) => {
      if (i === this.modals!.length - 1) {
        modal.front = true;
      } else {
        modal.front = false;
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
