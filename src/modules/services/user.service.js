/**
 * @file
 * user.service.js
 *
 * @service: user
 */

var user = {};

/**
 * User logout.
 */
user.logout = function(options) {
  options.data.config = function(xhr) {
    xhr.setRequestHeader('X-CSRF-Token', Drupal.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  return options;
}

/**
 * User register.
 */
user.register = function(options) {
  options.data.config = function(xhr) {
    xhr.setRequestHeader('X-CSRF-Token', Drupal.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  return options;  
}

/**
 * User login handler.
 */
user.login = function(options) {
  options.data.url = Drupal.config.service_path + '/user/login';
  options.data.config = function(xhr) {
    xhr.setRequestHeader('X-CSRF-Token', Drupal.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  options.data.unwrapSuccess = function(response) {
    Drupal.sessid = response.sessid;
    Drupal.session_name = response.session_name;
    Drupal.user = response.user;
    Drupal.token = response.token;

    return response;
  }

  options.data.unwrapError = function(response) {
    return response;
  }

  return options;
}

module.exports = user;