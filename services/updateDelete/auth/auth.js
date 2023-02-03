const { jwtDecode } = require("./jwt");
const { getDB } = require("../config/mongoConnect");
const { ObjectId } = require("mongodb");

async function authenticate(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "InvalidToken" };
    }

    const payload = jwtDecode(access_token);
    if (!payload) {
      throw { name: "InvalidToken" };
    }

    const db = getDB();
    const users = db.collection("Users");
    const user = await users
      .find({ _id: new ObjectId(payload.id) })
      .limit(1)
      .toArray();
    console.log(user);
    if (user.length === 0) {
      throw { name: "InvalidToken" };
    }
    req.user = { id: user[0]._id };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authenticate };
