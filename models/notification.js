'use strict';

var mongoose = require('mongoose');

var notificationModel = function() {
    var notificationSchema = mongoose.Schema({
        title: {
            type: String
        },
        message: {
            type: String
        },
        tags: {
            type: String
        },
        : {
            type: String
        },
    });

    return mongoose.model('notificationList', notificationSchema);
}

module.exports = new notificationModel();