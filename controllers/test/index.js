'use strict';

module.exports = function(router) {
	router.get('/', function(req, res) {
		res.render('test');
	})

	router.post('/', function(req, res) {
		console.log(req);
		// res.send('Hello temp');
	})
}