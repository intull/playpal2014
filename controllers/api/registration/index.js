'use strict';

var RegistrationModel = require('../../../models/registration');
var ProfileModel = require('../../../models/profile');

module.exports = function (router) {
    router.get('/', function (req, res) {
        RegistrationModel.find(req.query, function(err, registrations) {
            var model = {registrationlist : registrations};
            console.log("model"+ model+registrations );
            res.render('register', model);              
        });
    });
    
    router.get('/new', function (req, res) {
        req.body = req.query;
        var status;
        var user = req.body.players;
        var userarr = user.split(",");

        console.log(userarr);

        ProfileModel.find({emailid : {$in : userarr}}, function(err, profiles) {
            if(profiles.length != userarr.length){
                res.json({success : false});
            } 
            else{
                var floor = profiles[0].floorno;
                for(var i in profiles){
                    if(floor!= profiles[i].floorno){
                        console.log("follr different");
                        res.json({success : false});
                        return;
                    }
                }


                switch(req.body.gamename){
                    case "badminton-single":
                            status = "confirmed";
                            break;
                    case "tabletennis-single":
                            status = "confirmed";
                            break;
                    case "chess":
                            status = "confirmed";
                            break;
                    case "carrom":
                            switch(userarr.length){
                                case 1:
                                    status = "unconfirmed";
                                    break;
                                case 2:
                                    status = "confirmed";
                                    break;
                            }
                            break;
                    case "tabletennis":
                            switch(userarr.length){
                                case 1:
                                    status = "unconfirmed";
                                    break;
                                case 2:
                                    status = "confirmed";
                                    break;
                            }
                            break;
                    case "badminton":
                            switch(userarr.length){
                                case 1:
                                    status = "unconfirmed";
                                    break;
                                case 2:
                                    status = "confirmed";
                                    break;
                            }
                            break;
                    default:
                            status = "confirmed";
                            break;
                }

        var newRegistration  = new RegistrationModel({
                                    gamename: req.body.gamename,
                                    players: userarr,
                                    status: status
                                });
        if(req.body.id){
            newRegistration.update({_id: req.body.id}, newRegistration, function(err,foo) {
                console.log("inside update")
                if (err) {
                    console.log("ERROR: " + err);
                    throw err;
                 }
                res.json({success :  true });
            });
        }
        else{
            newRegistration.save(function(err, foo) {
                console.log("inside save")
                if (err) {
                    console.log("ERROR: " + err);
                    throw err;
                }
                res.json({success :  true });
            });
        }

            }

        });

    });
};