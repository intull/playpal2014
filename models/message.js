'use strict';

var mongoose = require('mongoose');

var messageModel = function() {
    var messageSchema = mongoose.Schema({
        personname: {
            type: String
        },
        message: {
            type: String
        },
        date: {
            type: String
        }
    });

    return mongoose.model('messageList', messageSchema);
}

module.exports = new messageModel();
  