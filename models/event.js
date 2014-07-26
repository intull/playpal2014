'use strict';

var mongoose = require('mongoose');

var eventModel = function() {
    var eventSchema = mongoose.Schema({
        eventname: {
            type: String,
        },
        start: {
            type: String,
        },
        end: {
            type: String
        },
        teams: [{
            teamname: {
                type: String
            },
            floorno: {
                type: String
            },
            teamcaptain: {
                type: String
            }
        }],
        winner: {
            type: String
        },
        venue: {
            type: String
        }
    });

    return mongoose.model('eventList', eventSchema);
}

module.exports = new eventModel();
  
