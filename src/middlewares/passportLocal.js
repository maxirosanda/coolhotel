import Strategy from "passport-local";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
const localStrategy = Strategy.Strategy;

const passportLocal = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        github: user.github,
        linkedin: user.linkedin,
        portfolio: user.portfolio,
        knowledgeareas: user.knowledgeareas,
        gender: user.gender,
      };
      cb(err, userInformation);
    });
  });
};

export default passportLocal;