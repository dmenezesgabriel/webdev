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
    if (config.output && process.env['NODE_ENV'] === 'production') {
      config.output.publicPath = './';
    }
    return config;
  },
};
export default config;
