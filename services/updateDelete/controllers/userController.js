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
    } catch (error) {}
  }
}

module.exports = userController;
