const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin-next')

const { NODE_ENV = 'production' } = process.env

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: ['yarn migration:run', ...(NODE_ENV !== 'production' && ['yarn serve'])],
        blocking: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
}
