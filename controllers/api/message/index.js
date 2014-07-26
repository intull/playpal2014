'use strict';

var MessageModel = require('../../../models/message');

module.exports = function (router) {
    router.get('/', function (req, res) {
        MessageModel.find(req.query, function( err, messages) {
            res.json(messages);              
        });
    });

    router.post('/', function (req, res) {
        var newMessage  = new MessageModel({ personname:req.body.personname,
                                           message :req.body.message,
                                           date : req.body.date,
                                    });
        
        newMessage.save(function(err, foo) {
            if (err) {
                console.log("ERROR: " + err);
                throw err;
            }
    
        });
        res.json({ success :  true });
    });
};