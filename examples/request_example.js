/**
 * @file
 * request_example.js
 *
 * This example demonstrates how to make a single HTTP request
 * to a Drupal site via RESTful web services.
 */

/**
 * Request example.
 */
var example = {
  controller: function() {
    return {
      request: md.request({
        method: 'GET',
        url: '/node/1',
        background: true
      })
    }
  },
  view: function(ctrl) {
    if (ctrl.request.status()) {
      return m('article', [
        m('h1', {class: 'title'}, ctrl.request.data().title),
        m('.body', [
          m.trust(ctrl.request.data().body)
        ])
      ]);
    }
  }
}
