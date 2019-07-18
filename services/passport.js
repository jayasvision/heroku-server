const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');


// one argument means fetch and two means save
const User = mongoose.model('user');

/* first arg -> user model
second is done argument
ouath folow.. auth/google/callback either
retrieve the model or create a new one

*/
passport.serializeUser((user, done)=> {
  //done is a callback ... get access to mongodb id value
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// need to tell passport
// using cookies ( to track the user )

/*
clientId - public token - we can share this with the public
clientSecret - private token-we don't want anyone to see this
*/

passport.use(
  new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret : keys.googleClientSecret,
  callbackURL : keys.googleCallBackURL,
  proxy : true, 
}, (req, accessToken, refreshToken, profile, done) => {

  User.findOne({
    googleId: profile.id
  }).then((existingUser) => {
    if(existingUser) {
      //we alreay have a record with the given profile ID
      done(null, existingUser);
    } else {
      // we don't have the user record with this ID, make a new record

      //does not persist to database, but is inside express api
      //calling .saves to db
      //new User >> represents mongo model instance
         new User({
           googleId: profile.id
         }).save()
            .then(user => done(null, user));
    }
  })

  console.log("profile "+ accessToken);
    console.log(refreshToken);
      console.log(profile);
})
);
