(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mdrupal = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file
 * build.js
 */

// Expose user and config info.
// window.Drupal = require('./src/common.js');

// mdrupal core modules.
/*var mdrupal = require('./src/core/request.js');
mdrupal.core = {
  system: require('./src/core/system.js')
}

// @todo, bulkify module requires.
mdrupal.modules = {
  services: require('./src/modules/services/services.js'),
}*/

'use strict';

var mdrupal = {
  request: require('./core/request.js'),
  services: require('./core/services.js')
};

module.exports = mdrupal;

},{"./core/request.js":2,"./core/services.js":3}],2:[function(require,module,exports){
/**
 * @file
 * request.js
 *
 * m.request class wrapper for Drupal requests.
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Request = (function () {
  function Request(options) {
    _classCallCheck(this, Request);

    this.response = [];
    this.cache = [];

    // Defaults
    this.redrawTimeout = options.redrawTimeout ? options.redrawTimeout : 0;
    this.redrawPerQueue = options.redrawPerQueue ? options.redrawPerQueue : false;
    this.basePath = options.basePath ? options.basePath : '/drupal';

    this.params(options);
  }

  _createClass(Request, [{
    key: 'params',
    value: function params(options) {
      this.options = options.data;
      this.options.url = this.basePath + this.options.url;

      this.process();
    }
  }, {
    key: 'queue',
    value: function queue(options) {
      for (var i = 0; i < options.length; i++) {
        this.params({ data: options[i] });
      }

      return this.response;
    }
  }, {
    key: 'process',
    value: function process() {
      var index = this.cacheIndex(this.options.url, this.options.data);

      if (!this.cache[index]) {
        this.cache[index] = [];

        var completed = m.prop(false);
        var complete = (function (value) {
          completed(true);

          delete this.cache[index];
          return value;
        }).bind(this);

        var background = this.options.background ? true : false;
        var timeout = this.redrawTimeout;

        this.cache[index] = {
          data: m.request(this.options).then(complete, complete).then(function (value) {
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

      this.response.push(this.cache[index]);
    }
  }, {
    key: 'cacheIndex',
    value: function cacheIndex(url, data) {
      return JSON.stringify({ url: url, query: data });
    }

    /**
     * @todo, process per queue group?
     */
  }, {
    key: 'processQueue',
    value: function processQueue() {}
  }]);

  return Request;
})();

module.exports = Request;

},{}],3:[function(require,module,exports){
/**
 * @file
 * services.js
 *
 * Services handling for mdrupal; extends request
 * functionality.
 *
 * Please see https://www.drupal.org/project/services.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var Services = (function (_Request) {
  _inherits(Services, _Request);

  function Services() {
    _classCallCheck(this, Services);

    _get(Object.getPrototypeOf(Services.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Services, [{
    key: 'process',
    value: function process() {
      // var options = super.process();
    }
  }]);

  return Services;
})(_request2['default']);

module.exports = Services;

},{"./request":2}]},{},[1])(1)
});


//# sourceMappingURL=mdrupal.js.map
