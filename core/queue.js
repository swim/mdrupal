/**
 * @file
 * queue.js
 *
 * Provides util functionality for queuing requests.
 *
 * @todo, support easy entity loading.
 * @todo, support additional params passed.
 */
var request = require('./request.js');

var queue = (function() {
  var vm = {};

  vm.queue = function(options) {
    var response = [];

    for (var i = 0; i < options.request.length; i++) {
      response.push(request(options.request[i]));
    }

    return response;
  }

  return vm;
}())

module.exports = queue.queue;