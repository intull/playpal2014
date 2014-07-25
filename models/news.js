'use strict';

var mongoose = require('mongoose');

var newsModel = function() {
    var newsSchema = mongoose.Schema({
        title: {
            type: String
        },
        message: {
            type: String
        },
        date: {
            type: String
        },
        author: {
            type: String
        },
        hash: {
            type: String
        }
    });

    return mongoose.model('newsList', newsSchema);
}

module.exports = new newsModel();