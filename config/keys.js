//keys.js figure out what set of credeitnals to reutrn
if(process.env.NODE_ENV === 'production') {
  //we are in production - return the prod set of keys
  module.exports = require('./prod');

} else {
  //we are in development - return the dev keys
  //export dev.js and require_optional
  //module.exports = require('./dev');
  module.exports = require('./dev-prod');
}
