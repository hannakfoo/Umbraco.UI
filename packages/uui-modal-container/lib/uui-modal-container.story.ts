import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { UUIModalDialogElement } from '@umbraco-ui/uui-modal-dialog/lib';
import { UUIModalSidebarElement } from '@umbraco-ui/uui-modal-sidebar/lib';

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
  const generateModal = (event: MouseEvent) => {
    if (event.shiftKey) {
      generateDialog();
    } else {
      generateSidebar();
    }
  };

  const generateDialog = () => {
    const modal = new UUIModalDialogElement();
    modal.headline = 'Headline here';
    modal.innerHTML = `
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam molestias voluptatibus vero doloribus, quam nesciunt, non porro, rem dolor nostrum soluta adipisci veritatis dignissimos veniam debitis repudiandae possimus maxime dolorem?</p>
    `;

    modal.addEventListener('click', generateModal.bind(this));
    document.getElementById('modal-container')?.appendChild(modal);

    requestAnimationFrame(() => {
      const modalDialog = modal.shadowRoot?.querySelector(
        'dialog'
      ) as HTMLDialogElement;
      modalDialog.style.left = `${(Math.random() - 0.5) * 600}px`;
      modalDialog.style.top = `${(Math.random() - 0.5) * 200}px`;
    });
  };

  const generateSidebar = () => {
    const modal = new UUIModalSidebarElement();
    modal.innerHTML = `
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam molestias voluptatibus vero doloribus, quam nesciunt, non porro, rem dolor nostrum soluta adipisci veritatis dignissimos veniam debitis repudiandae possimus maxime dolorem?</p>
    `;

    modal.addEventListener('click', generateModal.bind(this));
    document.getElementById('modal-container')?.appendChild(modal);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    console.log('asdasd');

    switch (event.key) {
      case 'd':
        generateDialog();
        break;
      case 's':
        generateSidebar();
        break;
    }
  };

  return html`<uui-modal-container id="modal-container"></uui-modal-container>
    <uui-button look="primary" @click=${generateModal}>Add dialog</uui-button>
    <uui-button look="primary" @click=${generateSidebar}
      >Add sidebar</uui-button
    > `;
};
