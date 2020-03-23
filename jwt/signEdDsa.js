'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;
const isB64 = /^[\w-]+$/;

module.exports = function signEdDsa(PayloadObject, PublicKey, SecretKey, DIDkeyUrl) {
  const { JlincJwtError } = this;

  //input checking
  if (!PayloadObject || Array.isArray(PayloadObject) || typeof PayloadObject !== 'object') {
    throw new JlincJwtError('PayloadObject must be an object');
  }
  if (!PublicKey || !isB64.test(PublicKey)) {
    throw new JlincJwtError('no valid PublicKey found');
  }
  if (!SecretKey || !isB64.test(SecretKey)) {
    throw new JlincJwtError('no valid SecretKey found');
  }
  if (DIDkeyUrl && !/^did:jlinc:[\w-]+(#signing)?$/.test(DIDkeyUrl)) {
    throw new JlincJwtError('DIDkeyUrl must be a JLINC DID');
  }

  const keys = {pkey: b64.decode(PublicKey), skey: b64.decode(SecretKey)};
  if (keys.pkey.length !== sodium.crypto_sign_PUBLICKEYBYTES) {
    throw new JlincJwtError('PublicKey length must be crypto_sign_PUBLICKEYBYTES (32)');
  }
  if (keys.skey.length !== sodium.crypto_sign_SECRETKEYBYTES) {
    throw new JlincJwtError('SecretKey length must be crypto_sign_SECRETKEYBYTES (64)');
  }

  //construct the jwt
  const hdr = {
    alg: 'EdDSA',
    typ: 'JWT',
    jwk:
      {
        kty: 'OKP',
        crv: 'Ed25519',
        x: PublicKey
      }
  };
  if (DIDkeyUrl) {
    hdr.jwk.kid = DIDkeyUrl;
  }

  const header = Buffer.from(JSON.stringify(hdr), 'utf8');
  const payload = Buffer.from(JSON.stringify(PayloadObject), 'utf8');
  const toBeSigned = b64.encode(header) + '.' + b64.encode(payload);

  try {
    const signature = sodium.crypto_sign_detached(Buffer.from(toBeSigned), keys.skey);
    return toBeSigned + '.' + b64.encode(signature);
  } catch (e) {
    throw new JlincJwtError(`error: ${e.message}`);
  }

};
