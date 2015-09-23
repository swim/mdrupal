/**
 * @file
 * build.js
 */

// Expose user and config info.
window.Drupal = require('./src/common.js');

// mdrupal core modules.
var mdrupal = require('./src/core/request.js');
mdrupal.core = {
  system: require('./src/core/system.js')
}

// @todo, bulkify module requires.
mdrupal.modules = {
  services: require('./src/modules/services/services.js'),
}

module.exports = mdrupal;