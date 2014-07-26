'use strict';

var UserModel = require('../../models/user');
var ProfileModel = require('../../models/profile');

module.exports = function(router) {
	router.get('/', function(req, res) {
		res.render('signup');
	});

	router.post('/', function(req, res) {
		var user = new UserModel({
			emailid: req.body.emailid,
			password: req.body.password,
			role: 'user'
		});

		user.save(function(err, status) {
			if (err) {
				throw err;
			}

			var profile = new ProfileModel({
				emailid: req.body.emailid,
				username: req.body.username || null,
				about: req.body.about || null,
				floorno: req.body.floorno || null,
			});

			profile.save(function(err, status) {
				if (err) {
					res.json({success: false, err: err});
				} else {
					res.json({success: true});
				}
			});
		});

	});
}