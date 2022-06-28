import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

/**
 * @element uui-modal
 */
@defineElement('uui-modal')
export class UUIModalElement extends LitElement {
  static styles = [
    css`
      :host(.closing),
      :host(.closing) dialog {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      dialog {
        border: none;
        padding: 0;
        background: transparent;
        overflow: visible;
      }

      dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.25);
      }

      :host([front]) dialog::backdrop {
        animation: 250ms fadeIn forwards linear;
      }
      :host(:not([front])) dialog::backdrop {
        animation: 250ms fadeOut forwards linear;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `,
  ];

  @query('dialog')
  dialog!: HTMLDialogElement;

  @property({ type: String })
  headline = '';

  @property({ type: Boolean, attribute: 'front', reflect: true })
  front = false;

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    this.dialog.showModal();
  }

  public close(event: MouseEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.classList.add('closing');
    this.front = false;
    this.dispatchEvent(
      new CustomEvent('closing', { bubbles: true, composed: true })
    );

    setTimeout(() => {
      this.dialog.close();
      this.remove();
    }, 250); // has to be the same as the fade animation duration
  }

  render() {
    return html`
      <dialog>
        <uui-dialog>
          <uui-dialog-layout headline=${this.headline}>
            <slot></slot>
            <uui-button @click=${this.close} label="close" look="secondary"
              >Close</uui-button
            >
          </uui-dialog-layout>
        </uui-dialog>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal': UUIModalElement;
  }
}
