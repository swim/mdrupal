/**
 * @file
 * config.js
 *
 * mdrupal config.
 */
var config = {};

/**
 * Debug mode.
 */
config.debug = true;

/**
 * The website address and Drupal directory.
 */
config.base_path = 'http://mydomain/drupal';

/**
 * The file system path.
 */
config.file_path = 'sites/default/files/';

/**
 * The services endpoint.
 */
config.service_path = '/myservicepath';

module.exports = config;