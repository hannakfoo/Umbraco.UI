import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

const _keyframes = [{ opacity: '0' }, { opacity: '1' }];

const _options: KeyframeAnimationOptions = {
  duration: 250,
  fill: 'both',
  easing: 'linear',
  pseudoElement: '::backdrop',
};

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
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
    `,
  ];

  @query('dialog')
  dialog!: HTMLDialogElement;

  @property({ type: String })
  headline = '';

  private animation!: Animation;

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    this.dialog.showModal();
    this.animation = this.dialog.animate(_keyframes, _options);
    this.animation.finished.then(() => {
      this.animation.pause();
    });
    this.show();
    this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
  }

  public show() {
    if (!this.animation) return;

    console.log('show');

    this.animation.playbackRate = 1;
    this.animation.play();
  }

  private close(e: Event) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.classList.add('closing');
    this.dispatchEvent(new CustomEvent('closing', { bubbles: true }));

    this.hide();

    setTimeout(() => {
      this.remove();
    }, 250);
  }

  public hide() {
    if (!this.animation || this.animation.currentTime === 0) return;

    this.animation.playbackRate = -1;
    this.animation.play();
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
