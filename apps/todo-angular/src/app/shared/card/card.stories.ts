import { type Meta, type StoryObj } from '@storybook/angular';

import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Shared/Card',
  component: CardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {};

export const Title: Story = {
  args: {
    title: 'Just a card.',
  },
};

export const Subtitle: Story = {
  args: {
    title: 'Just a card.',
    subtitle: 'A nice looking card!',
  },
};

export const CardContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-card [title]="title" [subtitle]="subtitle">
        <div card-content>
          <p>This is the main content area of the card.</p>
        </div>
      </app-card>
    `,
  }),
};

export const CardContentFooter: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-card [title]="title" [subtitle]="subtitle">
        <div card-content>
          <p>This is the main content area of the card.</p>
        </div>
       <div card-footer>
          <p>This is the footer area of the card.</p>
        </div>
      </app-card>
    `,
  }),
};

export const FullCard: Story = {
  args: {
    title: 'Just a card.',
    subtitle: 'A nice looking card!',
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [title]="title" [subtitle]="subtitle">
        <div card-content>
          <p>This is the main content area of the card.</p>
        </div>
       <div card-footer>
          <p>This is the footer area of the card.</p>
        </div>
      </app-card>
    `,
  }),
};
