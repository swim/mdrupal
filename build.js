/**
 * @file
 * build.js
 */

var mdrupal = {
  user: {
    token: m.prop(false)
  },
  request: require('./core/request.js'),
  queue: require('./core/queue.js')
}

module.exports = mdrupal;