'use strict';

var mongoose = require('mongoose');

var registrationModel = function() {
    var registrationSchema = mongoose.Schema({
        emailid: {
            type: String,
        },
        username : {
            type: String
        },
        gamename: {
            type: String
        },
        status: {
            type: String
        }
    });

    return mongoose.model('registrationList', registrationSchema);
}

module.exports = new registrationModel();