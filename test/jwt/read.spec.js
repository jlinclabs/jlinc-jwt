'use strict';

const jwt = require('../../../jlinc-jwt');
const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiU29tZSBNZXNzYWdlIiwiaWF0IjoxNTgzMDIxNDgzfQ.PORS0WePr7fNmu4tNYeR7QKo5gj9h66fNQgn_2_tSng';

describe('read', function() {

  context('when given a valid jwt', function(){
    const result = jwt.read(validJwt);
    it('should return a correct object', function(){
      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(4);
      expect(result).to.deep.include({
        signed: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiU29tZSBNZXNzYWdlIiwiaWF0IjoxNTgzMDIxNDgzfQ',
        signature: 'PORS0WePr7fNmu4tNYeR7QKo5gj9h66fNQgn_2_tSng',
        header: { alg: 'HS256', typ: 'JWT' },
        payload: { message: 'Some Message', iat: 1583021483 }
      });
    });
  });

  context('when given a valid jwt in compat mode', function(){
    const result = jwt.read(validJwt, true);
    it('should return a correct payload object', function(){
      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(2);
      expect(result).to.include({
        message: 'Some Message', iat: 1583021483
      });
    });
  });

  context('when given unexpected input', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.read({});
      }).to.throw('Input must be a JWT');
    });
  });

  context('when given malformed JWT', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.read('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiU29tZSBNZXNzYWdlIiwiaWF0IjoxNTgzMDIxNDgzfQ');
      }).to.throw('Input must be a JWT');
    });
  });

  context('when given bad header', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.read('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV.eyJtZXNzYWdlIjoiU29tZSBNZXNzYWdlIiwiaWF0IjoxNTgzMDIxNDgzfQ.PORS0WePr7fNmu4tNYeR7QKo5gj9h66fNQgn_2_tSng');
      }).to.throw('Header cannot be parsed');
    });
  });

  context('when given bad payload', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.read('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiU29tZSBNZXNzYWdlIiwiaWF0IjoxNTgzMDIxNDg.PORS0WePr7fNmu4tNYeR7QKo5gj9h66fNQgn_2_tSng');
      }).to.throw('Payload cannot be parsed');
    });
  });

  context('when given bad payload in compat mode', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.read('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiU29tZSBNZXNzYWdlIiwiaWF0IjoxNTgzMDIxNDg.PORS0WePr7fNmu4tNYeR7QKo5gj9h66fNQgn_2_tSng', true);
      }).to.throw('Payload cannot be parsed');
    });
  });

});
