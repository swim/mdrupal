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

  init() {
    this.process();
  }

  process() {
    var index = this.cacheIndex(this.params.url, this.params.data);

    if (!this.cache[index]) {
      var completed = m.prop(false)
      var complete = function(value) {
        completed(true)

        delete this.cache[index];
        return value;
      }.bind(this)

      var background = this.params.background ? true : false;
      var timeout = this.settings.redrawTimeout;

      this.cache[index] = {
        data: m.request(this.params).then(complete, complete).then(function(value) {
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