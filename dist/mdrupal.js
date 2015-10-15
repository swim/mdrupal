(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mdrupal = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file
 * build.js
 */

'use strict';

var mdrupal = {
  user: {
    token: m.prop(false)
  },
  request: require('./core/request.js'),
  queue: require('./core/queue.js')
};

module.exports = mdrupal;

},{"./core/queue.js":4,"./core/request.js":5}],2:[function(require,module,exports){
/**
 * @file
 * request.js
 *
 * m.request class wrapper for Drupal requests.
 *
 * @todo, support views; paging etc.
 * @todo, implement another cache system outside of process with settings defined by request.
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Request = (function () {
  function Request(options) {
    _classCallCheck(this, Request);

    this.response = [];
    this.cache = [];

    // Default settings
    this.settings = options.settings ? options.settings : {};
    this.settings.redrawTimeout = options.settings.redrawTimeout ? options.settings.redrawTimeout : 0;
    this.settings.redrawPerQueue = options.settings.redrawPerQueue ? options.settings.redrawPerQueue : false;
    this.settings.basePath = options.settings.basePath ? options.settings.basePath : '';

    // Request params
    this.params = options.data;
    this.params.url = this.settings.basePath + this.params.url;

    this.init();
  }

  _createClass(Request, [{
    key: 'init',
    value: function init() {
      this.process();
    }
  }, {
    key: 'process',
    value: function process() {
      var index = this.cacheIndex(this.params.url, this.params.data);

      if (!this.cache[index]) {
        var completed = m.prop(false);
        var complete = (function (value) {
          completed(true);

          delete this.cache[index];
          return value;
        }).bind(this);

        var background = this.params.background ? true : false;
        var timeout = this.settings.redrawTimeout;

        this.cache[index] = {
          data: m.request(this.params).then(complete, complete).then(function (value) {
            if (background) {
              // (virtual) DOM renders too quick.
              // Set minimum wait for redraw time.
              setTimeout(function () {
                m.redraw();
              }, timeout);
            }

            return value;
          }),
          status: completed
        };
      }

      this.response = this.cache[index];
    }
  }, {
    key: 'cacheIndex',
    value: function cacheIndex(url, data) {
      return JSON.stringify({ url: url, query: data });
    }
  }]);

  return Request;
})();

module.exports = Request;

},{}],3:[function(require,module,exports){
/**
 * @file
 * rest.js
 *
 * Format request params for Drupal REST to parse.
 *
 * @todo, allow option to set auth type used.
 * @todo, check to ensure config is not already set.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var Rest = (function (_Request) {
  _inherits(Rest, _Request);

  function Rest() {
    _classCallCheck(this, Rest);

    _get(Object.getPrototypeOf(Rest.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Rest, [{
    key: 'init',
    value: function init() {
      // Set REST defaults
      var format = this.settings.format ? this.settings.format : 'json';
      this.params.url += '?_format=' + format;

      // Set basic HTTP auth.
      this.params.config = function (xhr) {
        xhr.setRequestHeader('Authorization', '');
      };

      _get(Object.getPrototypeOf(Rest.prototype), 'process', this).call(this);
    }
  }]);

  return Rest;
})(_request2['default']);

module.exports = Rest;

},{"./request":2}],4:[function(require,module,exports){
/**
 * @file
 * queue.js
 *
 * Provides util functionality for queuing requests.
 *
 * @todo, provide easy entity loading; prefil values.
 * @todo, support per request options; currently per queue.
 */
'use strict';

var request = require('./request.js');

var queue = (function () {
  var vm = {};

  vm.queue = function (requests, options) {
    var response = [];

    for (var i = 0; i < requests.length; i++) {
      response.push(request(requests[i], options));
    }

    return response;
  };

  return vm;
})();

module.exports = queue.queue;

},{"./request.js":5}],5:[function(require,module,exports){
/**
 * @file
 * request.js
 *
 * Abstracts the request response.
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classRest = require('./class/rest');

var _classRest2 = _interopRequireDefault(_classRest);

var request = (function () {
  var vm = {
    lock: m.prop(false)
  };

  vm.request = function (request, options) {
    var params = {
      data: request,
      settings: options ? options : {}
    };

    // check for CSRF token; otherwise request one.
    if (!vm.lock() && !mdrupal.user.token()) {
      vm.lock(true);

      new _classRest2['default']({
        data: {
          method: 'GET',
          url: '/rest/session/token',
          extract: function extract(xhr) {
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

    return new _classRest2['default'](params).response;
  };

  return vm;
})();

module.exports = request.request;

},{"./class/rest":3}]},{},[1])(1)
});


//# sourceMappingURL=mdrupal.js.map
