const moment = require('moment');


// Logger Middleware
const logger = function(req, res, next){
	console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
	next();
};

module.exports = logger;
