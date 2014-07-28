'use strict';


var kraken = require('kraken-js'),
	db = require('./lib/database'),
    passport = require('passport'),
    auth = require('./lib/auth'),
    Profile = require('./models/profile'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    app = express(),
    options = {
        onconfig: function (config, next) {
            //any config setup/overrides here
            db.config(config.get('databaseConfig'));

            next(null, config);
        }
    },
    port = process.env.PORT || 8000;


app.use(kraken(options));

app.on('middleware:after:session', function configPassport(eventargs) {
    passport.use(auth.localStrategy());
    passport.serializeUser(function(profile, done) {
        done(null, profile.emailid);
    });
    passport.deserializeUser(function(emailid, done) {
        Profile.findOne({
            emailid: emailid
        }, function(err, profile) {
            done(null, profile);
        });
    });
    // app.use(cookieParser());
    // app.use(session({ secret: 'ertygfde4567uju789okmn', cookie: { maxAge : 1200000 } }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use("/", express.static(__dirname));
});

app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
  
});