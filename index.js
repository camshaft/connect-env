/**
 * Module dependencies
 */

var envs = require('envs');

/**
 * Expose env middleware
 */

module.exports = function(options) {
  options = options || {};
  var header = options.header || 'x-env';
  var defaultVal = options['default'] || envs('NODE_ENV', 'production');

  return function reqEnv(req, res, next) {
    req.env = req.headers[header] || defaultVal;
    next();
  };
};
