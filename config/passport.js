const passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let db = require("../models");

passport.use(new LocalStrategy(
    {
      usernameField: "email"
    },
    ((email, password, done) => {
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }s
        return done(null, dbUser);
      });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;