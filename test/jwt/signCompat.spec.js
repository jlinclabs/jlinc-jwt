'use strict';

const jwt = require('../../../jlinc-jwt');
const payload = {message: 'Yet Even Another  Message'};
const validSecret = 'veryverysecret';
const isJWT = /^[\w-]+\.[\w-]+\.[\w-]+$/;

describe('signCompat', function() {

  context('when given an object and secret', function(){
    const result = jwt.sign(payload, validSecret);
    it("should return a verifiable HMAC'd JWT", function(){
      expect(isJWT.test(result)).to.be.true;
      const verified = jwt.verifyHmac(result, validSecret);
      expect(verified).to.deep.include({
        signed: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiWWV0IEV2ZW4gQW5vdGhlciAgTWVzc2FnZSJ9',
        signature: 'lzjXN-v-UuMKCr3gdpExXnLV_Eek24zqMb-mXcJPllU',
        header: { alg: 'HS256', typ: 'JWT' },
        payload: { message: 'Yet Even Another  Message' }
      });
    });
  });

});
