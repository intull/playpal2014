'use strict';

var mongoose = require('mongoose');

var mediaModel = function() {
    var mediaSchema = mongoose.Schema({
        name: {
            type: String
        },
        path: {
            type: String
        },
        description: {
            type: String
        },
        date: {
            type: String
        },
        addedby: {
            type: String
        },
        category: {
            type: String
        }
        type: {
            type: String
        },
        format: {
            type: String
        }
    });

    return mongoose.model('mediaList', mediaSchema);
}

module.exports = new mediaModel();