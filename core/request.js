/**
 * @file
 * request.js
 *
 * Abstracts the request class.
 */
import Rest from './class/rest';

var request = (function() {
  var vm = {};

  vm.request = function(params) {
    return new Rest({data: params}).response;
  }

  return vm;
}())

module.exports = request.request;