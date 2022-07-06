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
      dialog {
        border: none;
        padding: 0;
        background: transparent;
        overflow: visible;
      }

      dialog > *:after {
        content: '';
        display: block;
        position: absolute;
        inset: 0;
        opacity: 0;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.25);
        transition: opacity 250ms linear;
      }

      :host([fade]) dialog > *:after {
        opacity: 1;
      }

      dialog::backdrop {
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.25);
      }
    `,
  ];

  @query('dialog')
  protected dialog!: HTMLDialogElement;

  @property({ type: Boolean, attribute: 'closing', reflect: true })
  public closing = false;

  private animation!: Animation;
  private _keyframes = [{ opacity: '0' }, { opacity: '1' }];
  private _options: KeyframeAnimationOptions = {
    duration: 250,
    fill: 'both',
    easing: 'linear',
    pseudoElement: '::backdrop',
  };

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    this.dialog.showModal();
    this.dialog.addEventListener('cancel', event => {
      event.preventDefault();
      this.close(event);
    });

    this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
  }

  public showBackdrop() {
    if (this.animation) return;

    this.animation = this.dialog.animate(this._keyframes, this._options);
    this.animation.finished.then(() => {
      this.animation.pause();
    });
  }

  public hideBackdrop() {
    if (!this.animation) return;

    this.animation.playbackRate = -1;
    this.animation.play();
  }

  public close(e?: Event) {
    if (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    if (this.closing) return;

    const event = new CustomEvent('close', {
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    if (event.defaultPrevented) return;

    this.closing = true;
    this.hideBackdrop();

    requestAnimationFrame(() => {
      this.dispatchEvent(
        new CustomEvent('close-start', { bubbles: true, composed: true })
      );
      this.animateClose();
    });
  }

  protected animateClose() {
    setTimeout(() => {
      this.finalizeClose();
    }, 250);
  }

  protected finalizeClose() {
    this.dialog.close();
    this.dispatchEvent(
      new CustomEvent('close-end', { bubbles: true, composed: true })
    );
    this.remove();
  }

  protected renderContent() {
    return html``;
  }

  render() {
    return html` <dialog>${this.renderContent()}</dialog> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal': UUIModalElement;
  }
}
