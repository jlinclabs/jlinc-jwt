'use strict';

module.exports = function decode(jsonWebToken) {
  return this.read(jsonWebToken, true);
};
