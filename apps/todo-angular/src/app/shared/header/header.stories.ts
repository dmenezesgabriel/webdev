import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { HeaderComponent } from './header.component';
import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';

const meta: Meta<HeaderComponent> = {
  title: 'Shared/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RouterModule.forChild([
          {
            path: 'iframe.html',
            redirectTo: '/sign-up',
            pathMatch: 'full',
          },
        ]),
      ],
    }),
    applicationConfig({
      providers: [
        provideRouter([
          {
            path: 'iframe.html',
            redirectTo: '/sign-up',
            pathMatch: 'full',
          },
        ]),
        importProvidersFrom(AppRoutingModule),
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {};
