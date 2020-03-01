'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiMatchPattern = require('chai-match-pattern');
const sinonChai = require('sinon-chai');
//const sodium = require('sodium').api;
//const b64 = require('urlsafe-base64');

chai.use(chaiAsPromised);
chai.use(chaiMatchPattern);
chai.use(sinonChai);

global.expect = chai.expect;
global._ = chaiMatchPattern.getLodashModule();

global.console.inspect = function(...args){
  return global.console.log(...args.map(arg => inspect(arg, { showHidden: true, depth: null })));
};

global.console.json = function(...args) {
  return global.console.log(args.map(o => JSON.stringify(o, null, 2)).join("\n"));
};
