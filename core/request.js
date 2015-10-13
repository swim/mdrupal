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

    // Defaults
    this.redrawTimeout = options.redrawTimeout ? options.redrawTimeout : 0;
    this.redrawPerQueue = options.redrawPerQueue ? options.redrawPerQueue : false;
    this.basePath = options.basePath ? options.basePath : '/drupal';

    this.params(options);
  }

  params(options) {
    this.options = options.data;
    this.options.url = this.basePath + this.options.url;

    this.process();
  }

  queue(options) {
    for (var i = 0; i < options.length; i++) {
      this.params({data: options[i]});
    }

    return this.response;
  }

  process() {
    var index = this.cacheIndex(this.options.url, this.options.data);

    if (!this.cache[index]) {
      this.cache[index] = [];

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

    this.response.push(this.cache[index]);
  }

  cacheIndex(url, data) {
    return JSON.stringify({url: url, query: data});
  }

  /**
   * @todo, process per queue group?
   */
  processQueue() {

  }
}

module.exports = Request;