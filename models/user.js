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
        },
    });

    userSchema.methods.passwordMatches = function (plainText) {
        var user = this;
        return user.password === plainText;
    };

    return mongoose.model('userlists', userSchema);
}

module.exports = new userModel();
