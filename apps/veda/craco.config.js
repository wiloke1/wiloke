const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const appConfig = require('../../app.config');

const configuration = {
  jsOutput: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
  },
  cssOutput: {
    filename: 'static/css/[name].css',
    chunkFilename: 'static/css/[name].chunk.css',
  },
};
const packages = appConfig.transpilePackages.map(packageName => path.join(__dirname, `../../packages/${packageName}`));

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      if (arg.mode !== 'production') {
        webpackConfig.output.filename = configuration.jsOutput.filename;
        webpackConfig.output.chunkFilename = configuration.jsOutput.chunkFilename;
        webpackConfig.plugins = webpackConfig.plugins.map(item => {
          if (!(item.options && item.options.filename && item.options.filename.includes('.css'))) {
            return item;
          }
          return new MiniCssExtractPlugin({
            filename: configuration.cssOutput.filename,
            chunkFilename: configuration.cssOutput.chunkFilename,
          });
        });
        webpackConfig.optimization = {
          runtimeChunk: 'single',
          splitChunks: {
            maxInitialRequests: Infinity,
            minSize: 40000,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                chunks(chunk) {
                  return chunk.name === 'main';
                },
                name(module) {
                  const modulesName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                  if (modulesName && modulesName.length) {
                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    return packageName.replace('@', '');
                  }
                },
              },
            },
          },
        };
      }

      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      const rules = webpackConfig.module.rules.find(rule => !!rule.oneOf).oneOf;
      const babelLoaderRule = rules.find(rule => rule.loader && rule.loader.includes('babel-loader'));
      babelLoaderRule.options.plugins.push(require.resolve('@babel/plugin-proposal-logical-assignment-operators'));
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];

        match.loader.include = include.concat(packages);
      }
      return webpackConfig;
    },
  },
};
