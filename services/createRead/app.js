const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const { mongoConnect, getDB } = require("./config/mongoConnect");
const router = require("./router");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = process.env.PORT || 4000;

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(router);

app.use(errorHandler);

mongoConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
