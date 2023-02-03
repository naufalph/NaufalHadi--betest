const jwt = require("jsonwebtoken");
const SECRET = process.env.jwt_SECRET;
function jwtEncode(payload) {
  return jwt.sign(payload, SECRET);
}
function jwtDecode(token) {
  console.log(token)
  return jwt.verify(token, SECRET);
}

module.exports = {
  jwtEncode,
  jwtDecode,
};
