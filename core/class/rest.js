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

    // Set request headers.
    this.requestHeaders();    

    // Process request.
    super.process();
  }

  requestHeaders() {
    var headers = this.settings.headers ? this.settings.headers : [];
    this.params.config = function(xhr) {
      for (var i = 0; i < headers.length; i++) {
        xhr.setRequestHeader(headers[i].type, headers[i].value);
      }

      // Set CSRF token, if available.
      if (md.user.token()) {
        xhr.setRequestHeader('X-CSRF-Token', md.user.token());
      }
    }
  }
}

module.exports = Rest;