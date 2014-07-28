'use strict';

var GameModel = require('../../models/game');

module.exports = function(router) {
	router.get('/', function(req, res) {
		var game = new GameModel({
			"gamename" : "Foosball",
			"description" : "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p> <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
			"rules" : "media/foosball.pdf",
			"events" : [], 
			"imagepath" : "games/fooseball.jpg"
		});
		game.save(function(err, status) {
			if (err) {
				throw err;
			}
			res.send('Done!');
		});
	});

	router.post('/', function(req, res) {
		console.log(req);
		// res.send('Hello temp');
	})
}