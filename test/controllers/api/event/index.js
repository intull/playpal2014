'use strict';

var EventModel = require('../../../models/event');
var TeamModel = require('../../../models/team');

module.exports = function (router) {
    router.get('/', function (req, res) {
        EventModel.find(req.query, function( err, events) {
            res.json(events);            
        });
    });
    router.post('/', function (req, res) {
        var newEvent  = new EventModel({
                        eventname : req.body.eventname || null,
                        start : req.body.start || null,
                        end : req.body.end || null,
                        winner : req.body.winner || null,
                        venue : req.body.venue || null,
        });

        TeamModel.find({teamname: { $in: req.body.teams.split(',')}}, {teamname: 1, teamcaptain: 1, floorno: 1, _id: 0}, function(err, teams) {
            newEvent.teams = teams;
            newEvent.save(function(err, foo) {
                if (err) {
                    console.log("ERROR: " + err);
                    throw err;
                }
            });
            res.json({ success :  true });
        });
    });
};