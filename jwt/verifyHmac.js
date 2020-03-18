'use strict';

const b64 = require('urlsafe-base64');
const crypto = require('crypto');

module.exports = function verifyHmac(JWT, SecretString) {
  const { JlincJwtError } = this;

  const decoded = this.read(JWT);
  if (decoded.header.alg !== 'HS256') {
    throw new JlincJwtError('header does not indicate HS256');
  }
  if (typeof SecretString !== 'string') {
    throw new JlincJwtError('SecretString must be a string');
  }

  const hmac = crypto.createHmac('sha256', SecretString);
  hmac.update(decoded.signed);
  const testsig = hmac.digest();

  if (b64.encode(testsig) !== decoded.signature) {
    throw new JlincJwtError(`invalid signature: got ${b64.encode(testsig)} but wanted ${decoded.signature}`);
  }

  return decoded;
}
