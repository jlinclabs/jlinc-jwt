'use strict';

const b64 = require('urlsafe-base64');
const crypto = require('crypto');

module.exports = function signHmac(payloadObject, secretString) {
  const { JlincJwtError } = this;

  if (typeof payloadObject !== 'object') {
    throw new JlincJwtError('payloadObject must be an object');
  }

  if (typeof secretString !== 'string') {
    throw new JlincJwtError('secretString must be a string');
  }

  const header = Buffer.from(JSON.stringify({alg: 'HS256', typ: 'JWT'}), 'utf8');
  const payload = Buffer.from(JSON.stringify(payloadObject), 'utf8');
  const toBeSigned = b64.encode(header) + '.' + b64.encode(payload);

  const hmac = crypto.createHmac('sha256', secretString);
  hmac.update(toBeSigned);
  const Jwt = hmac.digest();

  return toBeSigned + '.' + b64.encode(Jwt);
}
