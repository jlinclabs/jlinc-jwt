'use strict';

const jwt = require('../../../jlinc-jwt');
const payload = {message: 'YA Message'};
const validSecret = 'verysecret';
const isJWT = /^[\w-]+\.[\w-]+\.[\w-]+$/;

describe('signHmac', function() {

  context('when given an object and secret', function(){
    const result = jwt.signHmac(payload, validSecret);
    it('should return a verifiable JWT', function(){
      expect(isJWT.test(result)).to.be.true;
      const verified = jwt.verifyHmac(result, validSecret);
      expect(verified).to.deep.include({
        signed: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiWUEgTWVzc2FnZSJ9',
        signature: 'V7R5oMDl24MNuAKeoUg0_6VdVMO-h87L5fyuwH89DkU',
        header: { alg: 'HS256', typ: 'JWT' },
        payload: { message: 'YA Message' }
      });
    });
  });

  context('when given an invalid payload', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.signHmac(null, validSecret);
      }).to.throw('payloadObject must be an object');
      expect(() => {
        jwt.signHmac([], validSecret);
      }).to.throw('payloadObject must be an object');
      expect(() => {
        let unDefinedVar;
        jwt.signHmac(unDefinedVar);
      }).to.throw('payloadObject must be an object');
    });
  });

  context('when given an invalid secret', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.signHmac(payload);
      }).to.throw('secretString must be a string');
      expect(() => {
        jwt.signHmac(payload, []);
      }).to.throw('secretString must be a string');
      expect(() => {
        let unDefinedVar;
        jwt.signHmac(payload, unDefinedVar);
      }).to.throw('secretString must be a string');
    });
  });




});
