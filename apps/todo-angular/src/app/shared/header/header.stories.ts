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
import { provideHttpClient } from '@angular/common/http';
import { JwtAuthService } from '../../auth/jwt-auth.service';
import { BehaviorSubject } from 'rxjs';

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
        provideHttpClient(),
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

export const LoggedIn: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: JwtAuthService,
          useValue: {
            isLoggedIn$: new BehaviorSubject(true).asObservable(),
            logout: () => {},
          },
        },
      ],
    }),
  ],
};
