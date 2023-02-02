const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const { mongoConnect, getDB } = require("./config/mongoConnect");
// const router = require("./router");
// const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// app.use(router);
app.get("/", async (req, res, next) => {
  try {
    const db = getDB();
    const users = db.collection("Users");
    const data = await users.find({}).toArray();
    console.log(data);
    // if ((await data.count()) === 0) {
    //   throw { name: "NotFound" };
    // }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
app.post("/", async (req, res, next) => {
  try {
    const db = getDB();
    const users = db.collection("Users");
    const data = await users.insertOne({ username: 1, email: 1 })
    console.log(data);
    // if ((await data.count()) === 0) {
    //   throw { name: "NotFound" };
    // }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
// app.use(errorHandler);

mongoConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
