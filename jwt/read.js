'use strict';

const b64 = require('urlsafe-base64');

module.exports = function read(Jwt, compat) {
  const { JlincJwtError } = this;

  if (typeof Jwt !== 'string') {
    throw new JlincJwtError('Input must be a JWT');
  }

  const sections = Jwt.split('.');
  if (sections.length !== 3) {
    throw new JlincJwtError('Input must be a JWT');
  }

  if (compat) {
    try {
      return JSON.parse(b64.decode(sections[1]));
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new JlincJwtError('Payload cannot be parsed');
      } else {
        throw new JlincJwtError(`Error: ${e.message}`);
      }
    }
  }

  const result = {
    signed: sections[0] + '.' + sections[1],
    signature: sections[2]
  };
  try {
    result.header = JSON.parse(b64.decode(sections[0]));
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new JlincJwtError('Header cannot be parsed');
    } else {
      throw new JlincJwtError(`Error: ${e.message}`);
    }
  }
  try {
    result.payload = JSON.parse(b64.decode(sections[1]));
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new JlincJwtError('Payload cannot be parsed');
    } else {
      throw new JlincJwtError(`Error: ${e.message}`);
    }
  }


  return result;
};
