'use strict';

var GameModel = require('../../../models/game');
var EventModel = require('../../../models/event');

module.exports = function (router) {
    router.get('/', function (req, res) {
        GameModel.find(req.query, function( err, games) {
            res.json(games);              
        });
    });

    router.post('/', function (req, res) {
        var newGame  = new GameModel({ gamename:req.body.gamename,
                                        description :req.body.description,
                                        rulespath : req.body.rulespath
                                    });
        EventModel.find({eventname: { $in: req.body.events.split(',')}}, {eventname: 1, start: 1, end: 1, venue: 1, teams: 1, _id: 0}, function(err, events) {
            newGame.events = events;
            newGame.save(function(err, foo) {
                if (err) {
                    console.log("ERROR: " + err);
                    throw err;
                }
            });
        });
        res.json({ success :  true });
    });
};