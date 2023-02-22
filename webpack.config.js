const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const path = require('path');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    filename: `[name]${devMode ? '' : '.[contenthash]'}.js`,
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: ['babel-loader']
      },
      {
        test: /\.s?css$/i,
        use: [
          CssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|[to]tf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    devMode && new ReactRefreshPlugin(),
    new HtmlPlugin({
      template: path.resolve(__dirname, 'src', 'assets', 'template.html')
    }),
    new CssExtractPlugin({
      filename: `[name]${devMode ? '' : '.[contenthash]'}.css`
    })
  ].filter(Boolean),
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    client: { overlay: false },
    hot: true,
    open: true
  },
  devtool: devMode && 'eval-cheap-module-source-map'
};
