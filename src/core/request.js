/**
 * @file
 * request.js
 *
 * m.request wrapper for Drupal requests.
 */
var system = require('./system.js');

var request = (function() {
  var vm = {
    cache: {},
    completed: m.prop(false)
  };

  vm.request = function(options) {
    // Allow modules to extend the request call.
    var invoke = system.invoke(this.modules, 'request');
    return invoke.call(this, vm, options);
  }

  vm.process = function(options) {
    // Create cache index.
    var index = {url: options.data.url, query: options.data.data};
    index = JSON.stringify(index);

    // Check for response cache.
    if (!vm.cache[index]) {
      var error = function(value) {
        if (Drupal.debug) {
          console.log(value);
        }

        return value;
      }

      // Track when initial request is complete.
      vm.completed(false)
      var complete = function(value) {
        vm.completed(true)

        delete vm.cache[index];
        return value;
      }

      // Extend options with config.
      options.data = vm.build(options.data);
      vm.cache[index] = m.request(options.data).then(complete, error);
    }

    return vm.cache[index];
  }
  
  vm.build = function(data) {
    // Attempt to include CSRF token on all requests unless
    // config is already set.
    if (!data.config) {
      data.config = function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', Drupal.token);
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    }

    // Append base path.
    data.url = Drupal.config.base_path + data.url;

    return data;
  }

  return vm;
}())

module.exports = request;