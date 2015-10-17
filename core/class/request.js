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
    this.completed = m.prop(false);

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
    this.cacheIndex(this.params.url, this.params.data);

    if (!this.cache[this.index]) {
      var background = this.params.background ? true : false;
      var timeout = this.settings.redrawTimeout;

      this.cache[this.index] = {
        data: m.request(this.params).then(this.success.bind(this), this.error.bind(this)).then(function(response) {
          if (background) {
            // (virtual) DOM renders too quick.
            // Set minimum wait time for redraw.
            setTimeout(function() {
              m.redraw()
            }, timeout)
          }

          return response;
        }),
        status: this.completed
      };
    }

    this.response = this.cache[this.index];
  }

  success(response) {
    this.completed(true)

    delete this.cache[this.index];
    return response;
  }

  error(response) {
    delete this.cache[this.index];
    return response;
  }

  cacheIndex(url, data) {
    this.index = JSON.stringify({url: url, query: data});
  }
}

module.exports = Request;