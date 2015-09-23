#### About
mDrupal provides a Drupal friendly wrapper for Mithril.js's m.request function. mDrupal aims to be a lite weight solution for using Mithril.js as a front end framework with Drupal. mDrupal is less than 5kb uncompressed.

#### Requirements
 - Mithril
 - Drupal 7
 - Services

#### Installation
Download and include mdrupal.js after mithril.js in your page header, E.G.
```
<script src="lib/mdrupal/dist/mdrupal.js"></script>
```

#### Modules
Modules are plugable extensions to the core mDrupal functionality. mDrupal compiles with every module it can find in the /modules directory. This keeps code organised while also exposing the mDrupal API to those who need it.

##### Services
Provides integration with the Drupal Services module.

##### Form
Please see, https://github.com/swim/mithril.form.

##### Menu
Requires the Services Menu module. Provides easy output of a Drupal managed menu.

#### Themes
TBA

#### Roadmap
 - Complete readme, installation etc.
 - Move Services config to the services module.
 - Add bulkify as a dev dep for modules.
 - Provide build script.
 - Complete example, includes Bartik theme.
 - Provide per request completion status.
 - Provide a RESTws plugin/ module similar to that of the Services integration.
 - Provide Drupal 8 support when released.
