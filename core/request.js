/**
 * @file
 * request.js
 *
 * Abstracts the request response.
 */
import Rest from './class/rest';

var request = (function() {
  var vm = {};

  vm.request = function(request, options) {
    var params = {
      data: request,
      settings: options ? options : {}
    };

    return new Rest(params).response;
  }

  return vm;
}())

module.exports = request.request;