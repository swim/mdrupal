/**
 * @file
 * queue_example.js
 *
 * This example demonstrates how to queue requests.
 */

/**
 * Queue requests example.
 */
var example = {
  controller: function() {
    return {
      request: md.queue([
        {
          method: 'GET',
          url: '/node/1',
          background: true
        },
        {
          method: 'GET',
          url: '/node/2',
          background: true
        },
        {
          method: 'GET',
          url: '/node/4',
          background: true
        }
      ])
    }
  },
  view: function(ctrl) {
    ctrl.nodes.map(function(value) {
      if (value.status()) {
        return m('article', [
          m('h1', {class: 'title'}, value.data().title),
          m('.body', [
            m.trust(value.data().body)
          ])
        ]);
      }
    })
  }
}
