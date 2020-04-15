'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;
const isB64 = /^[\w-]+$/;

module.exports = function signEdDsa(payloadObject, publicKey, secretKey, didKeyUrl) {
  const { JlincJwtError } = this;

  //input checking
  if (!payloadObject || Array.isArray(payloadObject) || typeof payloadObject !== 'object') {
    throw new JlincJwtError('payloadObject must be an object');
  }
  if (!publicKey || !isB64.test(publicKey)) {
    throw new JlincJwtError('no valid publicKey found');
  }
  if (!secretKey || !isB64.test(secretKey)) {
    throw new JlincJwtError('no valid secretKey found');
  }
  if (didKeyUrl && !/^did:jlinc:[\w-]+(#signing)?$/.test(didKeyUrl)) {
    throw new JlincJwtError('didKeyUrl must be a JLINC DID');
  }

  const keys = {pkey: b64.decode(publicKey), skey: b64.decode(secretKey)};
  if (keys.pkey.length !== sodium.crypto_sign_PUBLICKEYBYTES) {
    throw new JlincJwtError('publicKey length must be crypto_sign_PUBLICKEYBYTES (32)');
  }
  if (keys.skey.length !== sodium.crypto_sign_SECRETKEYBYTES) {
    throw new JlincJwtError('secretKey length must be crypto_sign_SECRETKEYBYTES (64)');
  }

  //construct the jwt
  const hdr = {
    alg: 'EdDSA',
    typ: 'JWT',
    jwk:
      {
        kty: 'OKP',
        crv: 'Ed25519',
        x: publicKey
      }
  };
  if (didKeyUrl) {
    hdr.jwk.kid = didKeyUrl;
  }

  const header = Buffer.from(JSON.stringify(hdr), 'utf8');
  const payload = Buffer.from(JSON.stringify(payloadObject), 'utf8');
  const toBeSigned = b64.encode(header) + '.' + b64.encode(payload);

  try {
    const signature = sodium.crypto_sign_detached(Buffer.from(toBeSigned), keys.skey);
    return toBeSigned + '.' + b64.encode(signature);
  } catch (e) {
    throw new JlincJwtError(`error: ${e.message}`);
  }

};
