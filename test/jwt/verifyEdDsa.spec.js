'use strict';

const jwt = require('../../../jlinc-jwt');
const validJwt = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJyYW5kb20tdW5pcXVlLXN0cmluZyJ9.519mNjaaGhGC9l9Dpxh_RfEP0-iBFLmm28viRaGdEHmwQSMnZvpleOlc-r3T3U8jqXyxnpBMWTYjx15NLHrtBw';
const validPublicKey = '6SM25Pe1jpm_D1mldT5ynLtR2znelM-75utfVHPAFxI';
const invalidPublicKey = '36tEUM17JsQeyQaGeha4SeAQrgA0LC9stVBOk-tQWOo';
const validJwtWithJwkHeader = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6Im1ZNXEyX3FpSmFhb1FETVRkTGo1NnRrUDUyaVV4WGcwcFNiOHUtUzFpQTAiLCJraWQiOiJkaWQ6amxpbmM6bVk1cTJfcWlKYWFvUURNVGRMajU2dGtQNTJpVXhYZzBwU2I4dS1TMWlBMCNzaWduaW5nIn19.eyJpc3MiOiJkaWQ6amxpbmM6bVk1cTJfcWlKYWFvUURNVGRMajU2dGtQNTJpVXhYZzBwU2I4dS1TMWlBMCIsImp0aSI6InVybjp1dWlkOjA3OWFjNzY3LTNmOWMtNGM5My1iNjhmLWMwNGE3ZDMyMDUwMCIsImlhdCI6MTYwNjk2MjU0MCwiZXhwIjoxNjA2OTYyODQwLCJ2ZXJpZmlhYmxlQ3JlZGVudGlhbCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsImh0dHBzOi8vcHJvdG9jb2wuamxpbmMub3JnL2NvbnRleHQvdmMtdjEuanNvbmxkIl0sImlkIjoiZGlkOmpsaW5jOmlDMkZTWGF4SDhIbUs4c0EwTzZHM1pCVlhwd2IzSUFfWGZyWVFEd25HRTgiLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiTWVtYmVyc2hpcENyZWRlbnRpYWwiXSwiaXNzdWVyIjoiZGlkOmpsaW5jOm1ZNXEyX3FpSmFhb1FETVRkTGo1NnRrUDUyaVV4WGcwcFNiOHUtUzFpQTAiLCJpc3N1YW5jZURhdGUiOiIyMDIwLTEyLTAzVDAyOjI5OjAwLjE5M1oiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJ0eXBlIjoiUGVyc29uIiwibWVtYmVyIjoiU2NvdHRpc2ggVGVjaCBBcm15Iiwibm9uY2UiOiJkMzBkMTMzNWUyOTUxOWRkYmFjMDg3ZTBmYjkzZmRhZDdjNmM2ZjI3YmUwOTU3Mzc1OGI3OGJjZDFjYTA0MDljIn0sInByb29mIjp7InR5cGUiOiJFZDI1NTE5U2lnbmF0dXJlMjAxOCIsImp3cyI6ImV5SmhiR2NpT2lKRlpFUlRRU0lzSW5SNWNDSTZJa3BYVkNJc0ltcDNheUk2ZXlKcmRIa2lPaUpQUzFBaUxDSmpjbllpT2lKRlpESTFOVEU1SWl3aWVDSTZJbTFaTlhFeVgzRnBTbUZoYjFGRVRWUmtUR28xTm5SclVEVXlhVlY0V0djd2NGTmlPSFV0VXpGcFFUQWlMQ0pyYVdRaU9pSmthV1E2YW14cGJtTTZiVmsxY1RKZmNXbEtZV0Z2VVVSTlZHUk1halUyZEd0UU5USnBWWGhZWnpCd1UySTRkUzFUTVdsQk1DTnphV2R1YVc1bkluMTkuLlNuYU5XUFNadjJQVkJZTWIwTFRLVmt0Mm9neUE3eUFrZWVzblI5TjA5aW4xOGpsQktHcHpRdzE5TW9VV2VtWURRSlpDMWNPd1k2MlBsZlB2cUNLVkJnIn19fQ.11B4NlPeAnrLWRqWxQiTfVYDXhiGrwt20DdENqRYorcyizEUSyfNln5IqeVn9t48O-T7FR4W0wVxrp6zwq-DAg';

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

  context('when given a valid jwt with a JWK in the header and no public key argument', function(){
    const result = jwt.verifyEdDsa(validJwtWithJwkHeader);
    it('should return a correct object', function(){
      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(4);
      expect(result).to.deep.include({
        signature: '11B4NlPeAnrLWRqWxQiTfVYDXhiGrwt20DdENqRYorcyizEUSyfNln5IqeVn9t48O-T7FR4W0wVxrp6zwq-DAg',
        header: {
          alg: 'EdDSA',
          typ: 'JWT',
          jwk: {
            kty: 'OKP',
            crv: 'Ed25519',
            x: 'mY5q2_qiJaaoQDMTdLj56tkP52iUxXg0pSb8u-S1iA0',
            kid: 'did:jlinc:mY5q2_qiJaaoQDMTdLj56tkP52iUxXg0pSb8u-S1iA0#signing'
          }
        }
      });
    });
  });

  context('when given a valid jwt with a valid JWK in the header but a bad public key argument', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.verifyEdDsa(validJwtWithJwkHeader, invalidPublicKey);
      }).to.throw('error: invalid signature');
    });
  });

  context('when given a valid jwt with a valid JWK in the header but a junk public key argument', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.verifyEdDsa(validJwtWithJwkHeader, 'foobar');
      }).to.throw(/error: argument publicKey must be 32U bytes/);
    });
  });

});
