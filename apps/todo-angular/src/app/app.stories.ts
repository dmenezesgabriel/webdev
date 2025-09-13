import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';

import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './core/user/user.service';
import { provideHttpClient } from '@angular/common/http';

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
        UserService,
        provideHttpClient(),
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
          CommonModule
        ),
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppComponent>;

export const Default: Story = {};
