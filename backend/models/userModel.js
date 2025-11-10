const db = require("../config/db");
const bcrypt = require("bcryptjs");

const createUser = async (name, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

module.exports = { createUser, findUserByEmail };
