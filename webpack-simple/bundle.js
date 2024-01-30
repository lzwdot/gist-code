const webapck = require('./lib/webpack')
const options = require('./webpack.config')

new webapck(options).run();