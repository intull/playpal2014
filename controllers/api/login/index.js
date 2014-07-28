'use strict';

var ProfileModel = require('../../../models/profile');
var passport = require('passport');

module.exports = function(router) {
	router.get('/', function(req, res) {
		req.body = req.query;
		passport.authenticate('local', {
			successRedirect: req.session.goingTo || '/api/login/done',
			failureRedirect: '/api/login/fail'
		})(req, res);
	});

	router.get('/done', function(req, res) {
		res.json({success: true});
	})

	router.get('/fail', function(req, res) {
		res.json({success: false});
	})
}