'use strict';

const jwt = require('../../../jlinc-jwt');
const validJwt = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJyYW5kb20tdW5pcXVlLXN0cmluZyJ9.519mNjaaGhGC9l9Dpxh_RfEP0-iBFLmm28viRaGdEHmwQSMnZvpleOlc-r3T3U8jqXyxnpBMWTYjx15NLHrtBw';
const validPublicKey = '6SM25Pe1jpm_D1mldT5ynLtR2znelM-75utfVHPAFxI';
const invalidPublicKey = '36tEUM17JsQeyQaGeha4SeAQrgA0LC9stVBOk-tQWOo';

describe('verifyEdDsa', function() {

  context('when given a valid jwt and public key', function(){
    const result = jwt.verifyEdDsa(validJwt, validPublicKey);
    it('should return a correct object', function(){
      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(4);
      expect(result).to.deep.include({
        signed: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJyYW5kb20tdW5pcXVlLXN0cmluZyJ9',
        signature: '519mNjaaGhGC9l9Dpxh_RfEP0-iBFLmm28viRaGdEHmwQSMnZvpleOlc-r3T3U8jqXyxnpBMWTYjx15NLHrtBw',
        header: { alg: 'EdDSA', typ: 'JWT' },
        payload: { jti: 'random-unique-string' }
      });
    });
  });

  context('when given a valid jwt but an invalid public key', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.verifyEdDsa(validJwt, invalidPublicKey);
      }).to.throw('error: invalid signature');
    });
  });

});
