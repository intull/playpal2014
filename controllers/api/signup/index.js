'use strict';

var SignupModel = require('../../../models/signup');
var UserModel = require('../../../models/user');
var ProfileModel = require('../../../models/profile');
var crypto = require('crypto');

var secret = "aBcdEFghiJKLmnopQRSTuvwxyZ";
var HOUR_IN_MS = 24 * 60 * 60 * 1000;

function generateVerificationKey(emailid) {
	var cipher = crypto.createCipher('aes-256-cbc', secret);
	var encrypted = cipher.update(emailid + ":" + (new Date).getTime(), 'utf8', 'base64') + cipher.final('base64');
	encrypted = encrypted.replace('+', '%2B');
	return encrypted;
}

module.exports = function(router) {
	router.get('/new', function(req, res) {
		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
		console.log(req.query);
		var user = new SignupModel({
			emailid: req.query.emailid,
			password: req.query.password,
			username: req.query.username,
			about: req.query.about || null,
			floorno: req.query.floorno,
			cubeno: req.query.cubeno,
			mobileno: req.query.mobileno,
			role: 'user',
			verificationkey: generateVerificationKey(req.query.emailid)
		});

		user.save(function(err, status) {
			if (err) {
				throw err;
			}

			res.json({success: true});
		});
	});

	router.get('/verify', function(req, res) {
		console.log(req.query.id);
		var decipher = crypto.createDecipher('aes-256-cbc', secret);
		var details = decipher.update(req.query.id, 'base64', 'utf8') + decipher.final('utf8');
		details = details.split(':');
		var emailid = details[0];
		var timestamp = parseInt(details[1]);

		console.log("Email: " + emailid);
		console.log("Timestamp: " + timestamp);

		if ((new Date()).getTime() < (timestamp + HOUR_IN_MS)) {
			SignupModel.findOne({emailid: emailid}, function(err, signupUser) {
				if (err) {
					throw err;
				}
				var user = new UserModel({
					emailid: signupUser.emailid,
					password: signupUser.password,
					role: signupUser.role,
				});
				user.save(function(err, status) {
					if (err) {
						throw err;
					}
					var profile = new ProfileModel({
						emailid: signupUser.emailid,
						username: signupUser.username,
						about: signupUser.about,
						mobileno: signupUser.mobileno,
						floorno: signupUser.floorno,
						cubeno: signupUser.cubeno,
						games: [],
						teams: []
					});
					profile.save(function(err, status) {
						if (err) {
							throw err;
						}
						SignupModel.remove(signupUser, function(err, status) {
							if (err) {
								throw err;
							}
							res.json({success: true});
						});
					})
				});
			});
		} else {
			res.json({success: false});
		}
	});
};