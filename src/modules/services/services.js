/**
 * @file
 * services.js
 *
 * Services handling for fawlty; extends request
 * functionality.
 *
 * Please see https://www.drupal.org/project/services.
 */

var services = (function() {
  var vm = {
    user: require('./user.service.js'),
    system: require('./system.service.js')
  };

  /**
   * Retrieve CSRF token from Drupal.
   */
  vm.token = function(request) {
    return request.process(vm.system.token({
      data: {
        method: 'GET',
        url: '/?q=services/session/token',
        background: true
      }
    }));
  }

  /**
   * Perform connection to Drupal.
   */
  vm.connect = function(request) {
    return request.process(vm.system.connect({
      data: {
        method: 'POST',
        url: Drupal.config.service_path + '/system/connect',
        background: true
      }
    }))
  }

  /**
   * Implements request hook.
   */
  vm.request = function(request, options) {
    if (options.query) {
      options.data.url += vm.param(options.query);
    }

    if (!Drupal.ready()) {
      return vm.token(request).then(function(token) {
        return vm.connect(request).then(function() {
          return request.process(options);
        })
      })
    }

    return request.process(options);
  }
    
  /**
   * Build request params for services module.
   */
  vm.param = function(query) {
    var response = '';
    var keys = Object.keys(query);

    vm.parameters = function(key, value) {
      var result = '';

      for (var param in value) {
        result += '&' + key + '[' + param + ']=' + value[param];
      }

      return result;
    }

    vm.filters = function(key, value) {
      var result = '';

      for (var param in value) {
        result += '&' + param + '=' + value[param];
      }

      return result;
    }

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = query[key];

      if (value) {
        response += vm[key](key, value);
      }
    }

    return response;
  }

  return vm;
}())

module.exports = services;