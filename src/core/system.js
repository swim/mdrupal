/**
 * @file
 * system.js
 *
 * Provides core functionality.
 */

var system = (function() {
  var vm = {
    cache: {}
  };

  /**
   * Allows other modules to invoke their defined
   * hook functions.
   *
   * @param modules
   * List of modules to search.
   *
   * @param callback
   * The module function to invoke.
   */
  vm.invoke = function(modules, callback) {
    var hook = '';

    // Does a module implement the requested hook?
    for (var module in modules) {
      var index = module + callback;

      if (vm.cache[index]) {
        hook = vm.cache[index];
      }
      // Cache response for future use.
      else if (modules[module][callback]) {
        vm.cache[index] = modules[module][callback];
        hook = modules[module][callback];
      }
    }

    return hook;
  }

  /**
   * Return system file path.
   *
   * @param uri
   * The local file path.
   */
  vm.file_path = function(uri) {
    var path = Drupal.config.base_path;

    if (uri.indexOf('public://') >= 0) {
      uri = uri.replace('public://', Drupal.config.file_path);
    }

    // Build path.
    path += '/' + uri;
    return path;
  }

  /**
   * Return clean url.
   *
   * @param value
   * The string to clean.
   */
  vm.clean_url = function(value) {
    var clean = false;

    if (value) {
      clean = value.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }

    return clean;
  }

  return vm;
}())

module.exports = system;