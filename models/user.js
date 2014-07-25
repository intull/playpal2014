'use strict';

var mongoose = require('mongoose');

var userModel = function() {
    var userSchema = mongoose.Schema({
        emailid: {
            type: String,
            unique: true
        },
        password : {
            type: String,
        },
        role: {
            type: String,
        }
    });

    return mongoose.model('userList', userSchema);
}

module.exports = new userModel();
