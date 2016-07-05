'use strict';

const osprey = require('osprey');

module.exports = ospreyMiddleware;

function ospreyMiddleware(pathToRamlFile, options) {
  let promise;
  options = options || {};
  options.disableErrorInterception = true;

  return (req, res, next) => (
    (promise || (promise = osprey.loadFile(pathToRamlFile, options)))
      .then((middleware) => middleware(req, res, next))
      .catch(next)
  );
}
