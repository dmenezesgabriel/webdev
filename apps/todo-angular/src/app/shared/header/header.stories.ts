import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Shared/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: {
  //     control: 'color',
  //   },
  // },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Primary: Story = {
  // args: {
  //   primary: true,
  //   label: 'Button',
  // },
};
