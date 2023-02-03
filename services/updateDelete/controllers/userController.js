const { jwtEncode } = require("../auth/jwt");
const { getDB } = require("../config/mongoConnect");

class userController {
  static async editUser(req, res, next) {
    try {
      const db = getDB();
      const users = db.collection("Users");
      const result = await users.updateOne(
        {
          accountNumber: req.params.accountNumber,
        },
        {
          $set: {
            userName: req.body.userName,
            // accountNumber: req.body.accountNumber,
            emailAddress: req.body.emailAddress,
            identityNumber: req.body.identityNumber,
          },
        }
      );
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async delUser(req, res, next) {
    try {
      const db = getDB();
      const users = db.collection("Users");
      const result = await users.deleteOne({
        accountNumber: req.params.accountNumber,
      });
      console.log(result);
      if (result.deletedCount === 1) {
        return res.status(200).json({
          message: `Successfully deleted user with account number : ${req.params.accountNumber}`,
        });
      } else {
        throw { name: "InvalidInput" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      const { emailAddress, accountNumber } = req.body;
      if (!accountNumber) {
        throw { name: "LoginError" };
      }
      const db = getDB();
      const users = db.collection("Users");
      const data = await users
        .find({ accountNumber, emailAddress })
        .limit(1)
        .toArray();
      console.log(data);
      if (data.length === 0) {
        throw { name: "LoginError" };
      } else {
        const payload = { id: data[0]._id };
        const token = jwtEncode(payload);
        return res.status(200).json({ access_token: token });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
