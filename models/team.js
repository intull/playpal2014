'use strict';

var mongoose = require('mongoose');

var teamModel = function() {
    var teamSchema = mongoose.Schema({
        teamname: {
            type: String,
            unique: true
        },
        floorno : {
            type: Number
        },
        gamename: {
            type: String
        },
        players: {
            type: [String]
        },
        teamcaptain: {
            type: String
        }
    });

    return mongoose.model('teamList', teamSchema);
}

module.exports = new teamModel();
  
  