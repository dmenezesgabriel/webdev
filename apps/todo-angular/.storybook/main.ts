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
      config.output.publicPath = './';
    }
    return config;
  },
};
export default config;
