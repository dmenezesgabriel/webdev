import {
  applicationConfig,
  moduleMetadata,
  type AngularRenderer,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { AppComponent } from './app.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HeaderComponent } from './shared/header/header.component';
import { CardComponent } from './shared/card/card.component';

import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

const meta: Meta<AppComponent> = {
  title: 'App',
  component: AppComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [HeaderComponent],
      imports: [
        ReactiveFormsModule,
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
        importProvidersFrom(
          ReactiveFormsModule,
          AppRoutingModule,
          CommonModule,
        ),
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppComponent>;

export const Default: Story = {};
