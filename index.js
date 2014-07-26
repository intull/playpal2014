'use strict';


var kraken = require('kraken-js'),
	db = require('./lib/database'),
    passport = require('passport'),
    auth = require('./lib/auth'),
    Profile = require('./models/profile'),
    app = require('express')(),
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
        done(null, profile.emailId);
    });
    passport.deserializeUser(function(emailId, done) {
        Profile.findOne({
            emailId: emailId
        }, function(err, profile) {
            done(null, profile);
        });
    });
    app.use(passport.initialize());
    app.use(passport.session());
});

app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
  
});