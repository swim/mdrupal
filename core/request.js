/**
 * @file
 * request.js
 *
 * Abstracts the request response.
 */
import Rest from './class/rest';

var request = (function() {
  var vm = {
    lock: m.prop(false)
  };

  vm.request = function(request, options) {
    var params = {
      data: request,
      settings: options ? options : {}
    };

    // check for CSRF token; otherwise request one.
    if (!vm.lock() && !mdrupal.user.token()) {
      vm.lock(true)

      new Rest({
        data: {
          method: 'GET',
          url: '/rest/session/token',
          extract: function(xhr) {
            var token = xhr.responseText;
  
            if (xhr.status == 200) {
              token = JSON.stringify(xhr.responseText);
            }

            // Set CSRF token.
            return mdrupal.user.token(token);
          }
        },
        settings: {
          format: ''
        }
      });
    }

    return new Rest(params).response;
  }

  return vm;
}())

module.exports = request.request;