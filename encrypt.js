import bcrypt from "bcrypt";

const SALT = 10;

export function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export function comparePassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export default encryptPassword;
