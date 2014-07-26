'use strict';

var ProfileModel = require('../../models/profile');
var passport = require('passport');

module.exports = function (router) {
    router.get('/', function(req, res) {
        console.log(req.session);
        res.send('Hello profile');
    });
};