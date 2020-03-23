# JLINC JSON WebToken

The [JLINC protocol](https://protocol.jlinc.org/) uses JSON WebTokens of type [JWS](https://www.rfc-editor.org/rfc/rfc7515) as a compact standards-based way to transmit SISAs and SISA Events between servers.

The standard NPM [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package supports 13 algorithms, only one of which (HS256) is used by JLINC, and does not support [EdDSA/Ed25519](https://tools.ietf.org/html/rfc8037#section-3.1) which we do need. It has many options and support for standard claims which we also don't need.

This package supports HS256 and EdDSA/Ed25519 algorithms only and tries to be a simple as possible to enable comprehensive security audit.
It has only two dependencies, [sodium](https://github.com/paixaop/node-sodium) and [urlsafe-base64](https://github.com/RGBboy/urlsafe-base64).

There are 3 compatibility methods, decode, sign and verify, to provide drop-in replacement for the default usage in the existing jsonwebtoken package.

## Expected Usage
given:

```js
const jwt = require('jlinc-jwt');
```
### Sign with HMAC/SHA256
```js
/*
PayloadObject must be a javascript object.
SecretString can be any string.
*/

jwt.signHmac(PayloadObject, SecretString) --> JWT
```

### Compatibility sign with HMAC/SHA256
```js
jwt.sign(PayloadObject, SecretString) --> JWT
```

### Sign with EdDSA/Ed25519
```js
/* 
PayloadObject must be a javascript object.
PublicKey and SecretKey are an Ed25519 keypair as created for example by sodium.crypto_sign_keypair().

The optional DIDKeyUrl argument, if present, is placed in the JWT header under jwk.kid,
i.e. a JSON-WebKey key-ID (https://www.rfc-editor.org/rfc/rfc7515#section-4.1.4).

If used, it must be either a JLINC DID or a JLINC DID url of the form {DID}#signing
*/

jwt.signEdDsa(PayloadObject, PublicKey, SecretKey[, DIDkeyUrl]) --> JWT
```

### Read a JWT
```js
/*
Presented with a valid JWT, returns an object with the following keys --

signed: the first two sections of the JWT
signature: the last section of the JWT
header: the decoded header object
payload: the decoded payload

*/

jwt.read(JWT) --> JWT information object
```

### Decode a JWT
```js
/*
Presented with a valid JWT, returns the payload object only.
Included for compatibility with the jsonwebtoken package, except that it throws
an error if the JWT is unreadable rather than returning null.
*/

jwt.decode(JWT) --> JWT payload object
```




### Verify a HMAC/SHA256 signed JWT
```js
/*
Presented with a valid HMAC/SHA256 signed JWT and the secret it was signed with,
returns an object as in Read above.
*/

jwt.verifyHmac(JWT, SecretString) --> JWT information object
```

### Compatibility verify a HMAC/SHA256 signed JWT
```js
/*
Same as above except returns the JWT payload only.
*/

jwt.verify(JWT, SecretString) --> JWT payload object
```

### Verify an EdDSA/Ed25519 signed JWT
```js
/*
JWTs created with this package's signEdDsa() method will contain the public key that
validates the signature in the JWT's header under the jwk.x key.
See https://tools.ietf.org/html/rfc8037#section-2.

If the public key is not available that way, perhaps because the JWT was created by a different
application, then it must be supplied by the optional second argument. If the public key
is present in both places, the supplied argument will be used.

On success returns an object as in Read above.
*/

jwt.verifyEdDsa(JWT[, PublicKey]) --> JWT information object
```

