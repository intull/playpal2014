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
        players: [{
            username: {
                type: String
            },
            emailid: {
                type: String
            },
            cubeno: {
                type: String
            },
            mobileno: {
                type: String
            }
        }],
        teamcaptain: {
            type: String
        }
    });

    return mongoose.model('teamList', teamSchema);
}

module.exports = new teamModel();
  
  