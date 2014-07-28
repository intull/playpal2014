'use strict';


var IndexModel = require('../models/index');
var ProfileModel = require('../models/profile');
var TeamModel = require('../models/team');
var GameModel = require('../models/game');

module.exports = function (router) {

    var model = new IndexModel();
    router.get('/', function (req, res) {
    	res.send('Hello index');
    });

};
