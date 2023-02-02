const { MongoClient } = require("mongodb");

const password = process.env.mongoDB_pass;
const uri = `mongodb+srv://bucat17:${password}@cluster0.uhugfzo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

let db;

async function mongoConnect() {
  try {
    console.log(uri);
    console.log(process.env.NODE_ENV);
    db = client.db("db_NaufalHadi_betest");
    // console.log(db);
  } catch (error) {
    await client.close()
  }
}
function getDB(){
  return db;
}

module.exports = {mongoConnect, getDB};
