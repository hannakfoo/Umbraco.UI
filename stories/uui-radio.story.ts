import { html } from 'lit-html';
import '@umbraco-ui/uui-radio/lib/index';
import { Story } from '@storybook/web-components';

export default {
  title: 'Inputs/Radio',
  component: 'uui-radio',
  args: {
    label: 'label',
    checked: false,
    disabled: false,
  },
};

export const Overview: Story = props =>
  html` <uui-radio
    .value=${props.value}
    .label=${props.label}
    .name=${props.name}
    ?disabled=${props.disabled}
    ?checked=${props.checked}
    >Label</uui-radio
  >`;

export const Disabled: Story = props => html` <uui-radio disabled
    >Disabled</uui-radio
  >
  <uui-radio disabled checked>Selected disabled</uui-radio>`;

Disabled.parameters = {
  controls: { include: [] },
};

export const GroupedOverview: Story = props =>
  html`
    <uui-radio-group name="Test">
      <uui-radio value="Value 1" disabled>Option 1</uui-radio>
      <uui-radio value="Value 2" label="Option 2"></uui-radio>
      <uui-radio value="Value 3">Option 3</uui-radio>
      <uui-radio value="Value 4" disabled>Option 4</uui-radio>
      <uui-radio value="Value 5" checked>Option 5</uui-radio>
      <uui-radio value="Value 6">Option 6</uui-radio>
      <uui-radio value="Value 7" disabled>Option 7</uui-radio>
    </uui-radio-group>
  `;
GroupedOverview.parameters = {
  controls: { include: [] },
};

export const GroupedSelectDisabled: Story = props =>
  html`
    <uui-radio-group name="Test">
      <uui-radio .value=${'Value 1'}>Option 1</uui-radio>
      <uui-radio
        .value=${'Value 2'}
        disabled
        checked
        label="Option 2"></uui-radio>
      <uui-radio .value=${'Value 3'}>Option 3</uui-radio>
    </uui-radio-group>
  `;
GroupedSelectDisabled.parameters = {
  controls: { include: [] },
};
