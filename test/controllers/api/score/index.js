'use strict';

var ScoreModel = require('../../../models/score');

module.exports = function (router) {
    router.get('/', function (req, res) {
        ScoreModel.find(req.query, function( err, scores) {
            res.json(scores);              
        });
    });

    router.post('/', function (req, res) {
        var newScore  = new ScoreModel({ eventname:req.body.eventname,
                                         teamname :req.body.teamname,
                                         score : req.body.score,
                                    });
        
        newScore.save(function(err, foo) {
            if (err) {
                console.log("ERROR: " + err);
                throw err;
            }
    
        });
        res.json({ success :  true });
    });
};