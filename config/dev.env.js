'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_TITLE: '"(測試) 点爭鮮 | 點餐系統"',
})
