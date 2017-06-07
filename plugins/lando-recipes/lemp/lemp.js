/**
 * LEMP recipe builder
 *
 * @name lemp
 */

'use strict';

module.exports = function(lando) {

  /*
   * Helper to return proxy config
   */
  var proxy = function() {
    return {
      nginx: [
        {port: '80/tcp', default: true},
        {port: '443/tcp', default: true, secure: true}
      ]
    };
  };

  /**
   * Build out LEMP
   */
  var build = function(name, config) {

    // Start by cheating
    var builder = require('./../lamp/lamp')(lando);
    var build = builder(name, config);

    // Replace the proxy
    build.proxy = proxy();

    // Set via to nginx
    build.services.appserver.via = 'nginx';

    // Return the things
    return build;

  };

  // Return teh build func
  return build;

};
