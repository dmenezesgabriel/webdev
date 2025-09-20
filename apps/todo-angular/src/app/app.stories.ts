import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { AppComponent } from './app.component';

import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

const meta: Meta<AppComponent> = {
  title: 'App',
  component: AppComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        SharedModule,
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
        AuthService,
        provideHttpClient(),
        provideRouter([
          {
            path: 'iframe.html',
            redirectTo: '/sign-up',
            pathMatch: 'full',
          },
        ]),
        importProvidersFrom(SharedModule, AppRoutingModule, CommonModule),
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppComponent>;

export const Default: Story = {};
