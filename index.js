import express from "express";
import Session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import userRouter from "./routes/userRoutes.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "./models/userModel.js";
import { comparePassword } from "./encrypt.js";

const PORT = 3000;
const app = express();

const session = Session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/example" }),
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ name: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!comparePassword(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  const { password, ...result } = user.toObject();
  done(null, result);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(session);

app.use(passport.initialize());

app.use(express.json());

app.use(userRouter);

mongoose.connect("mongodb://localhost:27017/example");

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
