import express from "express"; // default
import passport from "passport";
import { encryptPassword } from "../encrypt.js"; // named
import { User } from "../models/userModel.js";

const router = express.Router();

router.post("/user", async (req, res, next) => {
  const { name, password } = req.body;
  const hash = await encryptPassword(password);
  const result = await User.create({ name, password: hash });
  res.send(result);
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  console.log(req.session);
  res.send("Estas logueado");
});

router.get("/cookie", (req, res, next) => {
  console.log(req.session.passport);
  res.send(req.session.passport);
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.send("Logged out");
});

export default router;
