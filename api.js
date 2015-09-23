/**
 * @file
 * api.js
 *
 * Drupalism in all the worlds -_^; this file is for API examples
 * and does not get compiled.
 */

/**
 * hook.request
 *
 * Allows extension and control over the request process.
 * Example below uses the Drupal services module
 * and waits for the token and connect request 
 * to complete before attempting to parse additional requests.
 */
myModule.request = function(options) {
  var request = this;

  if (!Drupal.ready()) {
    // Drupal is not ready, complete token and connect 
    // requests before continuing. 
  }
}
