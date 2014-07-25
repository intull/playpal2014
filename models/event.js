'use strict';

var mongoose = require('mongoose');

var eventModel = function() {
    var eventSchema = mongoose.Schema({
        eventname: {
            type: String,
        },
        start : {
            type: String,
        },
        end: {
            type: String
        },
        teams: {
            type: [String]
        },
        winner: {
            type: String
        }
    });

    return mongoose.model('eventList', eventSchema);
}

module.exports = new eventModel();
  
