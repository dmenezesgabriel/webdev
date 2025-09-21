import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { initialize, mswLoader } from 'msw-storybook-addon';
import docJson from '../documentation.json';
import { themes } from '@storybook/theming';

setCompodocJson(docJson);

initialize(
  process.env['NODE_ENV'] === 'production'
    ? {
        serviceWorker: {
          url: './mockServiceWorker.js',
        },
      }
    : undefined
);

if (process.env['NODE_ENV'] === 'production') {
  // @ts-ignore
  __webpack_public_path__ =
    window.location.pathname
      .replace(/\/iframe\.html$/, '') // remove iframe.html if present
      .replace(/\/$/, '') + '/'; // ensure trailing slash
}

const preview: Preview = {
  parameters: {
    docs: {
      toc: true,
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#f4f4f4' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
