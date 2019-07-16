const express = require('express'); //sharing files between different files
                                  // import express from 'express'; ES2015 modules
const app = express(); // represents a running express app

//route handler
app.get('/', (req, res) => {
  res.send({hi: 'there'});
});

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
