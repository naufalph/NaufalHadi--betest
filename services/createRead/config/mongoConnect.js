const { MongoClient } = require("mongodb");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// const password = process.env.mongoDB_pass;

// const uri = `mongodb+srv://bucat17:${password}@cluster0.uhugfzo.mongodb.net/?retryWrites=true&w=majority`;
const uri = process.env.mongoDB_key;
const client = new MongoClient(uri, { tls: true });

let db;

async function mongoConnect() {
  try {
    db = client.db("db_NaufalHadi_betest");
  } catch (error) {
    await client.close();
  }
}
function getDB() {
  return db;
}

module.exports = { mongoConnect, getDB };
