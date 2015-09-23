/**
 * @file
 * system.service.js
 *
 * @service: system
 */
var system = {};

/**
 * System connect.
 */
system.connect = function(options) {
  options.data.config = function(xhr) {
    xhr.setRequestHeader('X-CSRF-Token', Drupal.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  options.data.unwrapSuccess = function(response) {
    Drupal.sessid = response.sessid;
    Drupal.session_name = response.session_name;
    Drupal.user = response.user;
    Drupal.ready(true);
  }

  options.data.unwrapError = function(response) {
    Drupal.ready(false);
    return response;
  }

  return options;
}

/**
 * Request CSRF token.
 */
system.token = function(options) {
  options.data.extract = function(xhr) {
    var token = xhr.responseText;
    if (xhr.status == 200) {
      token = JSON.stringify(xhr.responseText);
    }

    return token;
  }

  options.data.unwrapSuccess = function(token) {
    Drupal.token = token;

    return token;
  }

  return options;
}

module.exports = system;