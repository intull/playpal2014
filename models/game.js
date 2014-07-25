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
        events: {
            type: [String]
        }
    });

    return mongoose.model('gameList', gameSchema);
}

module.exports = new gameModel();
  