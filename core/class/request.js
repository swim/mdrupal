/**
 * @file
 * request.js
 *
 * m.request class wrapper for Drupal requests.
 */

class Request {
  constructor(options) {
    this.response = [];
    this.cache = [];

    // Default options
    this.redrawTimeout = options.redrawTimeout ? options.redrawTimeout : 0;
    this.redrawPerQueue = options.redrawPerQueue ? options.redrawPerQueue : false;
    this.basePath = options.basePath ? options.basePath : '';

    // Request params
    this.options = options.data;
    this.options.url = this.basePath + this.options.url;

    this.params();
  }

  params() {
    this.process();
  }

  process() {
    var index = this.cacheIndex(this.options.url, this.options.data);

    if (!this.cache[index]) {
      var completed = m.prop(false)
      var complete = function(value) {
        completed(true)

        delete this.cache[index];
        return value;
      }.bind(this)

      var background = this.options.background ? true : false;
      var timeout = this.redrawTimeout;

      this.cache[index] = {
        data: m.request(this.options).then(complete, complete).then(function(value) {
          if (background) {
            // (virtual) DOM renders too quick.
            // Set minimum wait for redraw time.
            setTimeout(function() {
              m.redraw()
            }, timeout)
          }

          return value;
        }),
        status: completed
      };
    }

    this.response = this.cache[index];
  }

  cacheIndex(url, data) {
    return JSON.stringify({url: url, query: data});
  }
}

module.exports = Request;