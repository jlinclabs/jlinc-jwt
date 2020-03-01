'use strict';

class JlincJwtError extends Error {
  constructor(message){
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};

module.exports =  {
  version: require('./package.json').version,
  JlincJwtError,

  // Sign with HMAC
  // signHmac(ObjectToSign, SecretString) -> JWT
  //signHmac: require('./signHmac'),

  // Sign with EdDSA subtype ed25519
  // signEdDsa(ObjectToSign, PublicKey, PrivateKey) -> JWT
  //signEdDsa: require('./signEdDsa'),

  // Sign with HMAC via compatibility function
  // sign(ObjectToSign, SecretString) -> JWT
  //sign: require('./signCompat'),

  // Verify HMAC
  // verifyHmac(JWT, SecretString) -> decoded JWT
  //verifyHmac: require('./verifyHmac'),

  // Verify EdDSA subtype ed25519
  // verifyEdDsa(JWT) -> decoded JWT
  // N.B. public key must be in header as jwk:k
  //verifyEdDsa: require('./verifyEdDsa'),

  // Verify assuming HMAC
  // verify(JWT, SecretString) -> decoded JWT
  //verify: require('./verifyCompat'),

  // Decode JWT
  // read(JWT) -> decoded JWT
  read: require('./read'),

  // Decode JWT with compatibility default options -> {complete:false}
  // decode(JWT) -> decoded JWT payload
  decode: require('./decode'),
};
