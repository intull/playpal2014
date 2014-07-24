'use strict';

var models = require('../../models/userProfile');
var EventModel = models.EventModel();

module.exports = function (router) {
    router.post('/', function (req, res) {
        var events = JSON.parse(req.body.events);
        console.log(events);

        for (var i in events) {
            var e = events[i];

            new EventModel(e).save(function(err, foo) {
                if (err) {
                    console.log("ERROR: " + err);
                    throw err;
                }
                console.log(e.title + " saved ...");
                res.send(events.length);
            });
        }
    });

    router.get('/', function(req, res) {
        EventModel.find(function(err, results) {
            if (err) {
                throw err;
            }

            res.json(results);
        })
    });

};