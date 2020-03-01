'use strict';

const jwt = require('../../jlinc-jwt');
const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiU29tZSBNZXNzYWdlIiwiaWF0IjoxNTgzMTAwMjI3fQ.JtNWU4vuvLuAZrSPVSThYmS0PMos99s9ywRx-ISiwEc';

describe('decode', function() {

  context('when given a valid jwt', function(){
    const result = jwt.decode(validJwt, true);
    it('should return a correct payload object', function(){
      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.have.lengthOf(2);
      expect(result).to.include({
        message: 'Some Message', iat: 1583100227
      });
    });
  });

  context('when given unexpected input', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.decode({});
      }).to.throw('Input must be a JWT');
    });
  });

  context('when given malformed JWT', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiU29tZSBNZXNzYWdlIiwiaWF0IjoxNTgzMDIxNDgzfQ');
      }).to.throw('Input must be a JWT');
    });
  });

  context('when given bad payload', function(){
    it('should throw error', function(){
      expect(() => {
        jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiU29tZSBNZXNzYWdlIiwiaWF0IjoxNTgzMTAwMjI.JtNWU4vuvLuAZrSPVSThYmS0PMos99s9ywRx-ISiwEc');
      }).to.throw('Payload cannot be parsed');
    });
  });

});
