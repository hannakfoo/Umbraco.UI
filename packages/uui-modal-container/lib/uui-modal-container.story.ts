import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { UUIModalDialogElement } from '@umbraco-ui/uui-modal-dialog/lib';
import { UUIModalSidebarElement } from '@umbraco-ui/uui-modal-sidebar/lib';
import '@umbraco-ui/uui-modal-container/lib/uui-modal-container-example';

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

export const Overview: Story = props => {
  return html`<uui-modal-container-example></uui-modal-container-example>`;
};
