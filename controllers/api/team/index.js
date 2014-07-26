'use strict';

var TeamModel = require('../../../models/team');
var ProfileModel = require('../../../models/profile');

module.exports = function (router) {
    router.get('/', function (req, res) {
        TeamModel.find(req.query, function( err, teams) {
            res.json(teams);            
        });
    });
    router.post('/', function (req, res) {
        var newTeam  = new TeamModel({
            teamname : req.body.teamname || null,
            floorno : req.body.floorno || null,
            teamcaptain : req.body.teamcaptain || null,
        });

        ProfileModel.find({emailid: { $in: req.body.players.split(',')}}, {emailid: 1, username: 1, cubeno: 1, mobileno: 1, _id: 0}, function(err, profiles) {
            newTeam.players = profiles;
            newTeam.save(function(err, foo) {
                if (err) {
                    console.log("ERROR: " + err);
                    throw err;
                }
            });
            res.json({ success :  true });
        });
    });
};