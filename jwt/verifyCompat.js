'use strict';

module.exports = function verifyCompat(JWT, SecretString) {
  const verified = this.verifyHmac(JWT, SecretString);
  return verified.payload;
}
