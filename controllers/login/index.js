'use strict';

var ProfileModel = require('../../models/profile');
var passport = require('passport');

module.exports = function(router) {
	router.get('/', function(req, res) {
		res.render('login');
	});

	router.post('/', function(req, res) {
		passport.authenticate('local', {
			successRedirect: '/profile',
			failureRedirect: '/login'
		})(req, res);
	});
}