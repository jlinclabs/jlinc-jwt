'use strict';

module.exports = function decode(Jwt) {
  return this.read(Jwt, true);
}
