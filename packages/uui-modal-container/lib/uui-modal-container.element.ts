import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { queryAll, queryAssignedElements } from 'lit/decorators.js';

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
    selector: 'dialog',
    flatten: true,
  })
  dialogs?: HTMLDialogElement[];

  private _onSlotchange(e: Event) {
    if (!this.dialogs) return;

    const style = document.createElement('style');
    style.textContent = `
    dialog:not(:last-child)::backdrop {
      background-color: transparent;
    }
    `;
    this.dialogs[this.dialogs?.length - 1].appendChild(style); //TODO: Please find an alternative to this
    this.dialogs[this.dialogs?.length - 1].showModal();
    console.log('hallo', this.dialogs[0]);
  }

  render() {
    return html`<slot @slotchange=${this._onSlotchange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-container': UUIModalContainerElement;
  }
}
