'use strict';

var ProfileModel = require('../../models/profile');
var passport = require('passport');
var auth = require('../../lib/auth');

module.exports = function (router) {
    router.get('/', auth.isAuthenticated({role: 'user', failureRedirect: '/login'}), function(req, res) {
        res.send('Hello profile');
    });
};