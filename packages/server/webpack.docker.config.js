const path = require('path');
const nodeExternals = require('webpack-node-externals');

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

module.exports = {
  entry: './src/server.ts',
  // externals: [nodeExternals()],
  mode: "production",
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/docker'),
    filename: 'server.js',
    library: "@refract-cms/server",
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(tsx|ts)?$/,
        loader: 'prettier-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};