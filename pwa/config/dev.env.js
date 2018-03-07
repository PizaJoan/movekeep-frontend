var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: "'http://192.168.1.41:8080'",
  AUTH: "'http://192.168.1.41:3000'"
})
