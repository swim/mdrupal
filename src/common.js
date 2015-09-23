/**
 * @file
 * common.js
 */
var config = require('./config.js');

/**
 * Define default values.
 */
var Drupal = {
  user: {
    uid: 0,
    name: 'Anonymous',
    roles: {'1': 'anonymous user'}
  },
  config: {
    base_path: config.base_path,
    service_path: config.service_path,
    file_path: config.file_path
  },
  ready: m.prop(false),
  token: false
};

module.exports = Drupal;