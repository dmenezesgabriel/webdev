import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {
      stylePreprocessorOptions: {
        includePaths: ['src'],
      },
    },
  },
  webpackFinal: async (config) => {
    if (config.output) {
      config.output.publicPath = '/webdev/storybook-angular/';
    }
    return config;
  },
};
export default config;
