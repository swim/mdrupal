/**
 * @file
 * queue.js
 *
 * Provides util functionality for queuing requests.
 *
 * @todo, provide easy entity loading; prefil values.
 * @todo, support per request options; currently per queue.
 */
var request = require('./request.js');

var queue = (function() {
  var vm = {};

  vm.queue = function(requests, options) {
    var response = [];

    for (var i = 0; i < requests.length; i++) {
      response.push(request(requests[i], options));
    }

    return response;
  }

  return vm;
}())

module.exports = queue.queue;