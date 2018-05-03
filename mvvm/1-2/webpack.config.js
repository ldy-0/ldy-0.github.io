module.exports = {
  entry: __dirname+'/index.js',
  output: {
    path: __dirname+'/',
    filename: 'main.js',
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader', },
      { test: /\.san$/, use: 'san-loader', },
      { test: /\.html$/, use: 'html-loader', },
      { test: /\.css$/, use: 'css-loader', },
    ]
  },
}