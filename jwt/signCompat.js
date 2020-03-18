'use strict';

module.exports = function sign(payloadObject, secretString) {
  return this.signHmac(payloadObject, secretString);
}
