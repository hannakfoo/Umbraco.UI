import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-input/lib/index';

export default {
  title: 'Inputs/Input',
  component: 'uui-input',
  id: 'uui-input',
  args: {
    value: '',
    label: 'Label',
    placeholder: 'Placeholder',
  },
  argTypes: {
    type: {
      options: [
        'text',
        'tel',
        'url',
        'email',
        'password',
        'date',
        'month',
        'week',
        'time',
        'datetime-local',
        'number',
        'color',
      ],
    },
  },
};

const Template: Story = props =>
  html`
    <uui-input
      .disabled=${props.disabled}
      .error=${props.error}
      .hideLabel=${props.hideLabel}
      .label=${props.label}
      .type=${props.type}
      .name=${props.name}
      .placeholder=${props.placeholder}
      .value=${props.value}></uui-input>
  `;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';

AAAOverview.args = { type: 'text', hideLabel: false };

AAAOverview.parameters = {
  docs: {
    source: {
      code: '<uui-input></uui-input>',
    },
  },
};

export const Label = Template.bind({});
Label.args = { type: 'text', hideLabel: false };
Label.parameters = {
  controls: { include: ['type', 'value', 'label', 'hideLabel'] },
  docs: {
    source: {
      code: html`<uui-input label="Label"></uui-input>`.strings,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
Disabled.parameters = {
  controls: { include: ['disabled', 'type', 'value'] },
  docs: {
    source: {
      code: html`<uui-input disabled></uui-input>`.strings,
    },
  },
};

export const Error = Template.bind({});
Error.args = { error: true, label: 'Error' };
Error.parameters = {
  controls: { include: ['error', 'type', 'value'] },
  docs: {
    source: {
      code: html`<uui-input error></uui-input>`.strings,
    },
  },
};

export const PrependAndAppend: Story = props =>
  html`
    <uui-input
      .disabled=${props.disabled}
      .error=${props.error}
      .hideLabel=${props.hideLabel}
      .label=${props.label}
      .type=${props.type}
      .name=${props.name}
      .placeholder=${props.placeholder}
      .value=${props.value}>
      <div
        style="
        height: 100%;
        padding-left: 6px;
        display: flex;
        justify-content: center;
        align-items: center;"
        slot="prepend">
        umbraco@
      </div>
      <div
        slot="append"
        style="
        height: 100%;
        padding-right: 6px;
        display: flex;
        justify-content: center;
        align-items: center;">
        .com
      </div>
    </uui-input>
  `;

export const MultipleInputs: Story = props =>
  html`
    <uui-input
      .disabled=${props.disabled}
      .error=${props.error}
      .hideLabel=${props.hideLabel}
      .label=${props.label}
      .type=${props.type}
      .name=${props.name}
      .placeholder=${props.placeholder}
      .value=${props.value}>
      <uui-input
        slot="prepend"
        placeholder="+45"
        style="text-align:right; width: 60px;">
      </uui-input>
      <uui-input slot="append" placeholder="(extra)" style="width: 100px;">
      </uui-input>
    </uui-input>
  `;
