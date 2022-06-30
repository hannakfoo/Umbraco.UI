import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-modal-dialog',
  title: 'Modal Dialog',
  component: 'uui-modal-dialog',
  parameters: {
    docs: {
      source: {
        code: `<uui-modal-dialog></uui-modal-dialog>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-modal-dialog></uui-modal-dialog>`;
