'use strict';

var mongoose = require('mongoose');

var scoreModel = function() {
    var scoreSchema = mongoose.Schema({
        eventname: {
            type: String,
        },
        teamname : {
            type: String
        },
        score: {
            type: Object
        }
    });

    return mongoose.model('scoreList', scoreSchema);
}

module.exports = new scoreModel();
  