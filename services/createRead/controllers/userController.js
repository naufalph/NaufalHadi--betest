const mongoConnect = require("./config/mongoConnect");

class userController {
  static async findAllUsers(req, res, next) {
    try {
      const db = mongoConnect.db;
      const users = db.collection("Users");
      const data = await users
        .find({}, { projection: { _id: 1, username: 1, email: 1 } })
        .toArray();
      console.log(data);
      // if ((await data.count()) === 0) {
      //   throw { name: "NotFound" };
      // }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;