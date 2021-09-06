const { environment } = require('@rails/webpacker')
const webpack = require("webpack");

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  jquery: 'jquery',
  'window.jQuery': 'jquery',
  'window.$': 'jquery',
  Popper: ['popper.js', 'default']
}))

/**
 * To use jQuery in views
 */
environment.loaders.append('expose', {
  test: require.resolve('jquery'),
  use: [{
    loader: 'expose-loader',
    options: 'jQuery'
  },{
    loader: 'expose-loader',
    options: '$'
  }]
})

module.exports = environment
