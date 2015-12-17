/**
 * Created by italo on 12/16/2015.
 */

var passport = require('passport');

module.exports = function(app) {

  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/'
    }));

};