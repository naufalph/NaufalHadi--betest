const express = require("express");
const cors = require("cors");
const route = require("./route");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(route);

app.listen(PORT, () => {
  console.log(`orchestrator listening on Port : ${PORT}`);
});