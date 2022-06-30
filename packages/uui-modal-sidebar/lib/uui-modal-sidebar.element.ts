import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { UUIModalElement } from '@umbraco-ui/uui-modal/lib';
import { property, query } from 'lit/decorators.js';

/**
 * @element uui-modal-sidebar
 */
@defineElement('uui-modal-sidebar')
export class UUIModalSidebarElement extends UUIModalElement {
  static styles = [
    ...UUIModalElement.styles,
    css`
      dialog {
        height: 100%;
        width: 100%;
        margin: 0;
        left: auto;
        background-color: var(--uui-color-surface);
        position: relative;
        max-width: calc(100% - 160px);
        max-height: 100%;
        box-shadow: var(--uui-shadow-depth-3);
        transition: transform 250ms linear;
      }

      :host([data-modal-shrink='0']) dialog {
        max-width: calc(100% - 40px);
      }
      :host([data-modal-shrink='1']) dialog {
        max-width: calc(100% - 80px);
      }
      :host([data-modal-shrink='2']) dialog {
        max-width: calc(100% - 120px);
      }
      :host([data-modal-shrink='3']) dialog {
        max-width: calc(100% - 160px);
      }

      /* there are two more push values than shrink values because we want to push the element off the screen */
      :host([data-modal-push='0']) dialog {
        transform: translateX(0px);
      }
      :host([data-modal-push='1']) dialog {
        transform: translateX(-40px);
      }
      :host([data-modal-push='2']) dialog {
        transform: translateX(-80px);
      }
      :host([data-modal-push='3']) dialog {
        transform: translateX(-120px);
      }
      :host([data-modal-push='4']) dialog {
        transform: translateX(-160px);
      }
      :host([data-modal-push='5']) dialog {
        transform: translateX(-200px);
      }

      div {
        display: block;
        height: 100%;
        width: 100%;
        padding: 32px;
        box-sizing: border-box;
      }
    `,
  ];

  @property({ type: Number })
  pushDistance = 0;

  private _hideTimeout: number | null = null;
  private _animation: Animation | null = null;

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    this.push('100vw', '0');
  }

  public hide() {
    if (this._hideTimeout) return;

    this._hideTimeout = setTimeout(() => {
      this.style.display = 'none';
      this._hideTimeout = null;
    }, 250) as unknown as number; //TODO: fix type
  }

  public show() {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }
    this.style.display = '';
  }

  private push(from: string, to: string) {
    if (this._animation) {
      const transform = window.getComputedStyle(this.dialog).transform;
      const matrix = new DOMMatrix(transform);

      from = matrix.m41 + 'px'; // Get the translateX value
      this._animation.cancel();
    }
    const keyframes = [
      { transform: `translateX(${from})` },
      { transform: `translateX(${to})` },
    ];
    const options: KeyframeAnimationOptions = {
      duration: 250,
      fill: 'both',
      easing: 'linear',
    };

    return new Promise<void>(resolve => {
      this._animation = this.dialog.animate(keyframes, options);
      this._animation.onfinish = () => {
        this._animation?.cancel();
        resolve();
        this._animation = null;
      };
    });
  }

  protected close(e: Event) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (this.closing) return;

    this.closing = true;
    this.hideBackdrop();

    requestAnimationFrame(() => {
      this.dispatchEvent(
        new CustomEvent('closing', { bubbles: true, composed: true })
      );
    });

    this.push('0', '100vw').then(() => {
      this.dialog.close();
      this.remove();
    });
  }

  renderContent() {
    return html`<div>
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-sidebar': UUIModalSidebarElement;
  }
}
