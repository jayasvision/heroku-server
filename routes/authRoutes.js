const passport = require('passport');

/* wanted to authenticate with google,so first parameter
second param specifies asking google to give access to
profile and email  access, google has the list of scopes that we can
access for
*/
module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: [ 'profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'));
  //route handler
  app.get('/', (req, res) => {
    res.send({hi: 'there'});
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.session);
    //res.send(req.user);
  });

  app.get('/api/logout', (req, res)=> {
    //req is associated with passport automatically
    //it takes the cookies and kills the id
    req.logout();
    res.send(req.user);
  });
};
