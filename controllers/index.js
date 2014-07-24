'use strict';


var IndexModel = require('../models/index');
var models = require('../models/userProfile');

module.exports = function (router) {

    var model = new IndexModel();
    router.get('/', function (req, res) {
        
        res.render('index', model);
        
    });

};
