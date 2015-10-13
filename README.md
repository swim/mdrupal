#### About
mDrupal provides a Drupal friendly wrapper for Mithril.js's m.request function. mDrupal aims to be a lite weight solution for using Mithril.js as a front end framework with Drupal. mDrupal is less than 5kb uncompressed.

#### Requirements
 - Mithril
 - Drupal 8

#### Installation
For development usage download/clone and run npm install.

##### Usage
1. Require mdrupal via browserify into your project.
2. Download and include mdrupal.js after mithril.js in your page header, E.G.
```
<script src="lib/mdrupal/dist/mdrupal.js"></script>
```

Define your projects parameters, url etc.

#### Roadmap
 - Provide abstracted url params, e.g. build url during request.
 - Provide easy entity loading, allows for DRY(er) code; less repeating.
 - Something else.