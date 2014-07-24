
'use strict';

var mongoose = require('mongoose');

    var profileSchema = mongoose.Schema({
        playerName: {
            type: String
        },
        gameName: {
            type: String
        },
        floorNum : {
            type: Number,
        },
        cubicleNum: {
            type: Number,
        },
        emailId : {
            type: String,
        },
        mobileNum: {
                type: Number,
        }
    });

    var teamSchema = mongoose.Schema({
        floorNum: {
            type: Number
        },
        gameName: {
            type: String
        },
        playerNames: {
            type: [String]
        },
        score: {
            type: Number
        }
    });

    var eventSchema = mongoose.Schema({
        title: {
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
        backgroundColor: {
            type: String
        },
        borderColor: {
            type: String
        },
        teams: {
            type: [String]
        }
    });

    var scoreSchema = mongoose.Schema({
        gameName: {
            type: String
        },
        playerName: {
            type: String
        },
        score: {
            type: Number
        },
        floorNum: {
            type: Number
        },

    });

  exports.ProfileModel = function(){
                                    return mongoose.model('userProfileList', profileSchema);
                        }
  exports.TeamModel = function(){
                                    return mongoose.model('teamList', teamSchema);
                        }
  exports.EventModel = function(){
                                    return mongoose.model('eventList', eventSchema);
                        }
  exports.ScoreModel = function(){
                                    return mongoose.model('scoreList', scoreSchema);
                        }