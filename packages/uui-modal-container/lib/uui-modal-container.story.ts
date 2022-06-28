import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { UUIModalElement } from '@umbraco-ui/uui-modal/lib';

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
  const generateDialog = () => {
    const modal = new UUIModalElement();
    modal.headline = 'Headline here';
    modal.innerHTML = `
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam molestias voluptatibus vero doloribus, quam nesciunt, non porro, rem dolor nostrum soluta adipisci veritatis dignissimos veniam debitis repudiandae possimus maxime dolorem?</p>
    `;

    modal.addEventListener('click', generateDialog.bind(this));
    document.getElementById('modal-container')?.appendChild(modal);

    setTimeout(() => {
      const modalDialog = modal.shadowRoot?.querySelector(
        'dialog'
      ) as HTMLDialogElement;
      modalDialog.style.left = `${(Math.random() - 0.5) * 600}px`;
      modalDialog.style.top = `${(Math.random() - 0.5) * 200}px`;
      // modal.style.opacity = '1';

      console.log('modalDialog', modalDialog);
    }, 0);
  };

  return html`<uui-modal-container id="modal-container">
      <div>Hallo</div>
    </uui-modal-container>
    <uui-button @click=${generateDialog}>Add modal</uui-button> `;
};
