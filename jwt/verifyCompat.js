'use strict';

module.exports = function verifyCompat(jsonWebToken, secretString) {
  const verified = this.verifyHmac(jsonWebToken, secretString);
  return verified.payload;
};
