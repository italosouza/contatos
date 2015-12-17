/**
 * Created by italo on 12/16/2015.
 */
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');


module.exports = function() {

  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID: 'f8c54b6f26ceaa7ff380',
    clientSecret: '8412a8ee8b23d5f2810b011255a3246434aeb4e2',
    callbackURL: 'http://localhost/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {

    Usuario.findOrCreate(
      { "login" : profile.username},
      { "nome" : profile.username},
      function(erro, usuario) {
        if(erro) {
          console.log(erro);
          return done(erro);
        }
        return done(null, usuario);
      }
    );


  }));

  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id).exec()
      .then(function(usuario) {
        done(null, usuario);
      });
  });
};