'use strict';

var ProfileModel = require('../../../models/profile');
//var profileModel = models.profileModel();

module.exports = function (router) {
    router.get('/', function (req, res) {
        ProfileModel.find(req.query, function(err, profiles) {
            res.json(profiles);              
        });
    });
    
    router.post('/', function (req, res) {
        var newProfile  = new ProfileModel({username: req.body.username || null,
                                    floorno: req.body.floorno || null,
                                    cubeno: req.body.cubeno || null,
                                    emailid: req.body.emailid || null,
                                    mobileno: req.body.mobileno || null,
                                    password: req.body.password || null,
                                    about: req.body.about || null,
                                    games: req.body.games || null,
                                    teams: req.body.teams || null
                                });
        
        newProfile.save(function(err, foo) {
            if (err) {
                console.log("ERROR: " + err);
                throw err;
            }

            res.json({success :  true });
        });
    });

};