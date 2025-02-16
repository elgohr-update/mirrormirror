const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        type: 'asset',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '/images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'robots.txt'),
          to: path.resolve(__dirname, 'dist', 'robots.txt'),
        },
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, 'dist', 'assets'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: './src/index.html',
      inject: 'head',
    }),
    new HtmlWebpackPlugin({
      title: '404',
      filename: '404.html',
      template: './src/404.html',
      inject: 'head',
    }),
    new HtmlWebpackPlugin({
      title: 'About',
      filename: 'about.html',
      template: './src/about.html',
      inject: 'head',
    }),
    // new PreloadWebpackPlugin({
    //   rel: "preload",
    //   as(entry) {
    //     if (/\.(woff|woff2|ttf|otf)$/.test(entry)) return "font";
    //   },
    //   fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
    //   include: "allAssets",
    // }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],
  externals: {
    $: 'jquery',
    jquery: 'jQuery',
    'window.$': 'jquery',
  },
};
