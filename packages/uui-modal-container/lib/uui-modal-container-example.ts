import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement, TemplateResult } from 'lit';
import {
  query,
  queryAll,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { UUIModalElement } from '@umbraco-ui/uui-modal/lib';
import { UUIModalSidebarElement } from '@umbraco-ui/uui-modal-sidebar/lib';

/**
 * @element uui-modal-container-example
 */
@defineElement('uui-modal-container-example')
export class UUIModalContainerExample extends LitElement {
  static styles = [css``];

  @query('#container-example')
  container!: HTMLElement;

  private addDialog() {
    const element = html`<uui-modal-dialog>
      <h1>Modal Dialog</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde repellat
        totam error iure nesciunt aperiam officiis dolores mollitia pariatur
        autem repudiandae earum, rerum laborum facere quisquam ipsum ea
        dignissimos. Quo.
      </p>
      <div style="margin-top: auto; display: flex">
        <uui-button look="primary" @click="${this.addDialog}">
          Add Dialog
        </uui-button>
        <uui-button look="primary" @click="${this.addSidebar}">
          Add Sidebar
        </uui-button>
      </div>
    </uui-modal-dialog>`;

    this.modals = [...this.modals, element];
  }

  private addSidebar(size: string = 'full') {
    const element = html`<uui-modal-sidebar data-modal-size=${size}>
      <div style="display: flex; height: 100%; flex-direction: column; ">
        <h1>Modal Sidebar</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
          repellat totam error iure nesciunt aperiam officiis dolores mollitia
          pariatur autem repudiandae earum, rerum laborum facere quisquam ipsum
          ea dignissimos. Quo.
        </p>
        <div
          style="margin-top: auto; display: flex; justify-content: space-between;">
          <uui-button look="primary" @click="${this.addDialog}">
            Add Dialog
          </uui-button>
          <div style="justify-self: flex-end">
            <uui-button
              look="primary"
              @click="${() => this.addSidebar('full')}">
              Add full sidebar
            </uui-button>
            <uui-button
              look="primary"
              @click="${() => this.addSidebar('large')}">
              Add large sidebar
            </uui-button>
            <uui-button
              look="primary"
              @click="${() => this.addSidebar('medium')}">
              Add medium sidebar
            </uui-button>
            <uui-button
              look="primary"
              @click="${() => this.addSidebar('small')}">
              Add small sidebar
            </uui-button>
          </div>
        </div>
      </div>
    </uui-modal-sidebar>`;

    this.modals = [...this.modals, element];
  }

  @state()
  private modals: TemplateResult[] = [];

  render() {
    return html`
      <div>
        <uui-modal-container>${this.modals}</uui-modal-container>
        <uui-button look="primary" @click="${this.addDialog}">
          Add Dialog
        </uui-button>
        <uui-button look="primary" @click="${this.addSidebar}">
          Add Sidebar
        </uui-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-modal-container-example': UUIModalContainerExample;
  }
}
