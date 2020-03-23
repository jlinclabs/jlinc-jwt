'use strict';

const jwt = require('../../../jlinc-jwt');
const payload = {message: 'Important Message'};
const publicKey = 'mWvvK3sNyWqWpKI3jEVTW0NRFkDq8Ml316_0ctFKVLQ';
const secretKey = 'gcZgJt8_N61PgBkgf1isThUvjt7VSmoM7BNEk8SUCXGZa-8rew3JapakojeMRVNbQ1EWQOrwyXfXr_Ry0UpUtA';

const publicKey2 = '9oCf8KsQ6gL3JvruYguMmZ8hZKcqKuD617mniEtVxTc';
const secretKey2 = 'xH3-T7Do3LnUCvUGioPabdGc8Nmj6iBhRTbRWsn-yFz2gJ_wqxDqAvcm-u5iC4yZnyFkpyoq4PrXuaeIS1XFNw';
const didUrl = 'did:jlinc:9oCf8KsQ6gL3JvruYguMmZ8hZKcqKuD617mniEtVxTc#signing';

const isJWT = /^[\w-]+\.[\w-]+\.[\w-]+$/;

describe('signEdDsa', function() {
  context('when given an object and keys', function(){
    const result = jwt.signEdDsa(payload, publicKey, secretKey);
    it('should return a verifiable JWT', function(){
      expect(isJWT.test(result)).to.be.true;
      const verified = jwt.verifyEdDsa(result);
      expect(verified).to.deep.include({
        signed: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6Im1XdnZLM3NOeVdxV3BLSTNqRVZUVzBOUkZrRHE4TWwzMTZfMGN0RktWTFEifX0.eyJtZXNzYWdlIjoiSW1wb3J0YW50IE1lc3NhZ2UifQ',
        signature: 'Twbw8KZrO1TdJhSRbjBW8o9V0cvp_1VzLjinigFrjm78JAu4GtYhZmVSbRaaVrwELYXsQx-5EB2duNEEd4SPAg',
        header: { alg: 'EdDSA', typ: 'JWT', jwk: {kty: 'OKP', crv: 'Ed25519', x: `${publicKey}`}  },
        payload: { message: 'Important Message' }
      });
    });
  });

  context('when given an object, keys and a DID url', function(){
    const result = jwt.signEdDsa(payload, publicKey2, secretKey2, didUrl);
    it('should return a verifiable JWT', function(){
      expect(isJWT.test(result)).to.be.true;
      const verified = jwt.verifyEdDsa(result);
      expect(verified).to.deep.include({
        signed: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6IjlvQ2Y4S3NRNmdMM0p2cnVZZ3VNbVo4aFpLY3FLdUQ2MTdtbmlFdFZ4VGMiLCJraWQiOiJkaWQ6amxpbmM6OW9DZjhLc1E2Z0wzSnZydVlndU1tWjhoWktjcUt1RDYxN21uaUV0VnhUYyNzaWduaW5nIn19.eyJtZXNzYWdlIjoiSW1wb3J0YW50IE1lc3NhZ2UifQ',
        signature: 'XQHIxkkLUyAXsLNJYQnfovM6Bvk3UBg1DwuVzKgKDRKZCYjUUQXysoOHsXixQlMv7Dc1cc1W_mGqcrYTBH7FBg',
        header: { alg: 'EdDSA', typ: 'JWT', jwk: {kty: 'OKP', crv: 'Ed25519', x: `${publicKey2}`, kid: `${didUrl}`}  },
        payload: { message: 'Important Message' }
      });
    });
  });

  context('when given an invalid payload', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.signEdDsa(null, publicKey2, secretKey2, didUrl);
      }).to.throw('PayloadObject must be an object');
      expect(() => {
        jwt.signEdDsa([], publicKey2, secretKey2, didUrl);
      }).to.throw('PayloadObject must be an object');
      expect(() => {
        let unDefinedVar;
        jwt.signEdDsa(unDefinedVar, publicKey2, secretKey2, didUrl);
      }).to.throw('PayloadObject must be an object');
    });
  });

  context('when given an invalid public key', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.signEdDsa(payload);
      }).to.throw('no valid PublicKey found');
    });
  });

  context('when given an invalid secret key', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.signEdDsa(payload, publicKey2);
      }).to.throw('no valid SecretKey found');
    });
  });
  context('when given an invalid DID url', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.signEdDsa(payload, publicKey2, secretKey2, 'foobar');
      }).to.throw('DIDkeyUrl must be a JLINC DID');
    });
  });

  context('when given an invalid length public key', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.signEdDsa(payload, '9oCf8KsQ6gL3JvruYguMmZ8hZKcqKuD617mniEtV', secretKey2);
      }).to.throw('PublicKey length must be crypto_sign_PUBLICKEYBYTES (32)');
    });
  });

  context('when given an invalid length secret key', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.signEdDsa(payload, publicKey2, 'xH3-T7Do3LnUCvUGioPabdGc8Nmj6iBhRTbRWsn-yFz2gJ_wqxDqAvcm');
      }).to.throw('SecretKey length must be crypto_sign_SECRETKEYBYTES (64)');
    });
  });

});
