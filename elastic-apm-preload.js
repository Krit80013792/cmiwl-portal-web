//* Load the config from separate file
const config = require('./elastic-apm-node');
//* Start Elastic APM agent
require('elastic-apm-node').start(config);