import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-modal',
  title: 'Modal',
  component: 'uui-modal',
  parameters: {
    docs: {
      source: {
        code: `<uui-modal></uui-modal>`,
      },
    },
  },
};

export const Overview: Story = props =>
  html`<uui-modal></uui-modal>`;
