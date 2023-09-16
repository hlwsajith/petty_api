require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // Create the payload for the token
  const payload = {
    username: user.username,
    email: user.email,
    password: user.password,
  };

  // Sign the token with a secret key and set an expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });

  return token;
};

module.exports = generateToken;
