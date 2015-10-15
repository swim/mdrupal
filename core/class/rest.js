/**
 * @file
 * rest.js
 *
 * Format request params for Drupal REST to parse.
 *
 * @todo, allow option to set auth type used.
 * @todo, check to ensure config is not already set.
 */
import Request from './request';

class Rest extends Request {
  init() {
    // Set REST defaults
    var format = this.settings.format ? this.settings.format : 'json';
    this.params.url += '?_format=' + format;

    // Set basic HTTP auth.
    this.params.config = function(xhr) {
      xhr.setRequestHeader('Authorization', '');
    }

    super.process();
  }
}

module.exports = Rest;