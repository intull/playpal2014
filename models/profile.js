
'use strict';

var mongoose = require('mongoose');

var profileModel = function() {
    var profileSchema = mongoose.Schema({
        emailid: {
            type: String,
            unique: true
        },
        username: {
            type: String
        },
        about: {
            type: String
        },
        floorno: {
            type: Number
        },
        mobileno: {
            type: Number
        },
        games: {
            type: [String]
        },
        cubeno: {
            type: String
        },
        teams: {
            type: [String]
        }
    });

    return mongoose.model('profileList', profileSchema);
}

module.exports = new profileModel();
