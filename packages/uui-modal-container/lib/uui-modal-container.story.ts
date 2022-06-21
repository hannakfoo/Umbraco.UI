import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-modal-container',
  title: 'Modal Container',
  component: 'uui-modal-container',
  parameters: {
    docs: {
      source: {
        code: `<uui-modal-container></uui-modal-container>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-modal-container>
    <dialog>
      <h1>Modal 1</h1>
      <p>This is a modal</p>
      <button>Close</button>
    </dialog>
  </uui-modal-container>`;
