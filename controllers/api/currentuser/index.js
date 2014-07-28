'use strict';

var ProfileModel = require('../../../models/profile');

module.exports = function(router) {
	router.get('/', function(req, res) {
		console.log(req.session);
		console.log(req.session.passport);
		console.log(req.session.passport.user);
		ProfileModel.findOne({emailid: req.session.passport.user}, {_id: 0, __v: 0}, function(err, data) {
			console.log(data);
			res.json(data);
		});
	});
}