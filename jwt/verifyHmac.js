'use strict';

const b64 = require('urlsafe-base64');
const crypto = require('crypto');

module.exports = function verifyHmac(jsonWebToken, secretString) {
  const { JlincJwtError } = this;

  const decoded = this.read(jsonWebToken);
  if (decoded.header.alg !== 'HS256') {
    throw new JlincJwtError('header does not indicate HS256');
  }
  if (typeof secretString !== 'string') {
    throw new JlincJwtError('secretString must be a string');
  }

  const hmac = crypto.createHmac('sha256', secretString);
  hmac.update(decoded.signed);
  const testsig = hmac.digest();

  if (b64.encode(testsig) !== decoded.signature) {
    throw new JlincJwtError(`invalid signature`);
  }

  return decoded;
};
