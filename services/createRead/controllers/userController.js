const { getDB } = require("../config/mongoConnect");

class userController {
  static async findAllUsers(req, res, next) {
    try {
      const db = getDB();
      const users = db.collection("Users");
      const data = await users.find({}).toArray();
      console.log(data.length);
      if (data.length === 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async findAccountNumber(req, res, next) {
    try {
      const db = getDB();
      const users = db.collection("Users");
      const data = await users
        .find({ accountNumber: req.params.accountNumber })
        .limit(1)
        .toArray();
      console.log(data);
      if (data.length === 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async findIdNumber(req, res, next) {
    try {
      const db = getDB();
      const users = db.collection("Users");
      const data = await users
        .find({ identityNumber: req.params.identityNumber })
        .limit(1)
        .toArray();
      console.log(data);
      if (data.length === 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async postUser(req, res, next) {
    try {
      const db = getDB();
      const users = db.collection("Users");
      const data = await users.insertOne({
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
      });
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
