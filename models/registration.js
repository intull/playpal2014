'use strict';

var mongoose = require('mongoose');

var registrationModel = function() {
    var registrationSchema = mongoose.Schema({
        gamename: {
            type: String
        },
        status: {
            type: String
        },
        players: [{
            type: String
        }]
    });

    return mongoose.model('registrationList', registrationSchema);
}

module.exports = new registrationModel();