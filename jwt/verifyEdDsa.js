'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;
const isB64 = /^[\w-]+$/;

module.exports = function verifyEdDsa(jsonWebToken, publicKey) {
  const { JlincJwtError } = this;

  const decodedJwt = this.read(jsonWebToken);
  const pub = {};
  if (decodedJwt.header.alg !== 'EdDSA') {
    throw new JlincJwtError('header does not indicate EdDSA');
  }
  if (publicKey !== undefined) { // if publicKey is supplied it must be used!
    pub.key = publicKey;
  } else if (decodedJwt.header.jwk && decodedJwt.header.jwk.x && isB64.test(decodedJwt.header.jwk.x)) { // otherwise see if there is a JSON WebKey in the header
    pub.key = decodedJwt.header.jwk.x;
  } else {
    throw new JlincJwtError('cannot find a public key');
  }

  try {
    if(sodium.crypto_sign_verify_detached(b64.decode(decodedJwt.signature), Buffer.from(decodedJwt.signed), b64.decode(pub.key))) {
      return decodedJwt;
    } else {
      throw new JlincJwtError(`invalid signature`);
    }
  } catch (e) {
    throw new JlincJwtError(`error: ${e.message}`);
  }
};
