'use strict';

var mongoose = require('mongoose');

var gameModel = function() {
    var gameSchema = mongoose.Schema({
        gamename: {
            type: String,
        },
        description : {
            type: String
        },
        rules: {
            type: String
        },
        events: [{
            eventname: {
                type: String
            },
            start: {
                type: String
            },
            end: {
                type: String
            },
            venue: {
                type: String
            },
            teams: {
                type: [String]
            }
        }]
    });

    return mongoose.model('gameList', gameSchema);
}

module.exports = new gameModel();
  