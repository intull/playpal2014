'use strict';


var kraken = require('kraken-js'),
	db = require('./lib/database'),
    app = require('express')(),
    options = {
        onconfig: function (config, next) {
            db.config(config.get('databaseConfig'));
            //any config setup/overrides here
            next(null, config);
        }
    },
    port = process.env.PORT || 8000;


app.use(kraken(options));


app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
  
});