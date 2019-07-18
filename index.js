const express = require('express'); //sharing files between different files
                                  // import express from 'express'; ES2015 modules


require('./model/User');
require('./services/passport');


const app = express(); // represents a running express app
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// 30 days cookie will last milliseconds
//ecnrypted so no one can use it
app.use(
  cookieSession({
    maxAge: 30*24*60*60* 1000,
    keys: [keys.cookieKey]
  })
);


app.use(passport.initialize());
app.use(passport.session());

//passing app to authRoutes.js
require('./routes/authRoutes')(app);


app.get('/greet', (req, res) => {
  res.send({hi: 'there'});
});

/*Hereko runs our application, which has the capacity
to inject environment variables, environment variables,
are variables that are set underdlying
Hereko oppourtunity to inspect and inject it
if we are running on development environment
we need to handle the boolean statement
by default it will use 5000 and if env variable in
production will run on the configured port
*/
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});
