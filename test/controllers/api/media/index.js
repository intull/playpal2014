'use strict';

var formidable = require('formidable'),
    fs = require("fs");

module.exports = function (router) {
    router.get('/', function (req, res) {
        MediaModel.find(req.query, function( err, files) {
            res.json(files);              
        });
    });

    router.post('/', function (req, res) {
         console.log("hello1");//It prints
         var form = new formidable.IncomingForm(); 
         form.parse(req, function(err, fields, files) {
            console.log("Inside form parse.");//its not printing
            console.log("hello2");//its not printing
         });
        form.on('file', function(name, file) {console.log("hello3");});//its not printing
        form.on('error', function(err) { console.log("hello4"); });//its not printing
        form.on('aborted', function() { console.log('hello5'); });//its not printing
        console.log("hello6");
  
        res.json({ success :  true });
      });
};
        


   

