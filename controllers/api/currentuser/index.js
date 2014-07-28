'use strict';

var ProfileModel = require('../../../models/profile');

module.exports = function(router) {
	router.get('/', function(req, res) {
		ProfileModel.findOne({emailid: "p3@pp.com"}, {_id: 0, __v: 0}, function(err, data) {
			console.log(data);
			res.json(data);
		});
	});
}