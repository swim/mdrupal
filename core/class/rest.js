/**
 * @file
 * rest.js
 *
 * Format request params for Drupal REST to parse.
 *
 * @todo, allow option to set auth type used.
 * @todo, check to ensure config is not already set.
 * @todo, pass format type as option.
 */
import Request from './request';

class Rest extends Request {
  params() {
    // Set format type.
    this.options.url += '?_format=json';

    // Set basic HTTP auth.
    this.options.config = function(xhr) {
      xhr.setRequestHeader('Authorization', '');
    }

    super.process();
  }
}

module.exports = Rest;