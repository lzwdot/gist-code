const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const rootDir = path.join(__dirname);
const srcDir = `${rootDir}/src`;
const publicDir = `${rootDir}/public`;
module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: ['./dist/assets/js/main.js', './src/assets/css/main.scss'],
    editor: ['./dist/assets/js/editor.js'],
  },
  devtool: isDev ? 'inline-source-map' : false,
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    isDev
      ? new Function()
      : new PurgeCSSPlugin({
          paths: glob.sync(`${rootDir}/views/**/*.html`, {
            nodir: true,
          }),
        }),
  ],
  output: {
    filename: 'js/[name].js',
    path: `${publicDir}/assets`,
    clean: true,
    publicPath: '/assets',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
  resolve: {
    alias: {
      '@/*': srcDir,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
