'use strict';

const jwt = require('../../../jlinc-jwt');
const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiWWV0IEFub3RoZXIgTWVzc2FnZSIsImlhdCI6MTU4Mzg3NDgxNX0.oe6l1zLb-hgPXkn1q07S9Hz_T5_wHMqQcd1FkkLoQ5k';
const validSecret = 'supersecret';

describe('verifyHmac', function() {

  context('when given a valid jwt and secret', function(){
    const result = jwt.verifyHmac(validJwt, validSecret);
    it('should return a correct object', function(){
      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(4);
      expect(result).to.deep.include({
        signed: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiWWV0IEFub3RoZXIgTWVzc2FnZSIsImlhdCI6MTU4Mzg3NDgxNX0',
        signature: 'oe6l1zLb-hgPXkn1q07S9Hz_T5_wHMqQcd1FkkLoQ5k',
        header: { alg: 'HS256', typ: 'JWT' },
        payload: { message: 'Yet Another Message', iat: 1583874815 }
      });
    });
  });

  context('when given a valid jwt and an invalid secret', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.verifyHmac(validJwt, 'badsecret');
      }).to.throw('invalid signature');
    });
  });

  context('when given a invalid jwt signature', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.verifyHmac('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiWWV0IEFub3RoZXIgTWVzc2FnZSIsImlhdCI6MTU4Mzg3NDgxNX0.oe6l1zLb-hgPXkn1q07S9Hz_T5_wHMqQcd1Fkkxxxxx', validSecret);
      }).to.throw('invalid signature');
    });
  });

});
