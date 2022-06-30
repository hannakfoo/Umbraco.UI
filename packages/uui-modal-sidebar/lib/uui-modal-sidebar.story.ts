import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-modal-sidebar',
  title: 'Modal Sidebar',
  component: 'uui-modal-sidebar',
  parameters: {
    docs: {
      source: {
        code: `<uui-modal-sidebar></uui-modal-sidebar>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-modal-sidebar></uui-modal-sidebar>`;
