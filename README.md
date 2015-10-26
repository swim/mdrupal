#### About
mDrupal provides a Drupal friendly wrapper for Mithril.js's m.request function. mDrupal aims to be a lite weight solution for using Mithril.js as a front end framework with Drupal. This library is less than 10kb uncompressed.

#### Requirements
 - Mithril
 - Drupal 8
 - RESTful Web Services

#### Features
 - Checks and sets the users CSRF token
 - Tracks request completion status
 - Provides a request queue
 - Provides a request cache
 - Sets the request format

#### Installation
For development usage download/clone and run npm install.

##### Usage
Require mdrupal via browserify into your project.
or
Download and include mdrupal.js after mithril.js in your page header, E.G.
```
<script src="lib/mdrupal/dist/mdrupal.js"></script>
```

##### Examples
Request node 1.
```
var response = md.request({
  method: 'GET',
  url: '/node/1',
  background: true
}, {
  headers: [
    {
      type: 'Content-Type',
      value: 'application/json'
    }
  ],
  format: 'json',
  redrawTimeout: 1500
});
```
Queue and request nodes 1, 2 and 4.
```
var nodes = md.queue([
  {
    method: 'GET',
    url: '/node/1',
    background: true,
    initialValue: []
  },
  {
    method: 'GET',
    url: '/node/2',
    background: true,
    initialValue: []
  },
  {
    method: 'GET',
    url: '/node/4',
    background: true,
    initialValue: []
  }
])
```
Please see the examples folder for more complete examples.

#### Roadmap
 - Provide abstracted url params, e.g. build url during request.
 - Provide easy entity loading, allows for DRY(er) code; less repeating.
 - Provide cache outside of the request scope, e.g. not solely for multiple requests. 
 - Provide common render function.