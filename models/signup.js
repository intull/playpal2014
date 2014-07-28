'use strict';

var mongoose = require('mongoose');

var signupModel = function() {
    var signupModel = mongoose.Schema({
        emailid: {
            type: String,
        },
        password : {
            type: String
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
        cubeno: {
            type: String
        },
        mobileno: {
            type: Number
        },
        role: {
            type: String
        },
        verificationkey: {
            type: String
        }
    });

    return mongoose.model('signuplist', signupModel);
}

module.exports = new signupModel();
  