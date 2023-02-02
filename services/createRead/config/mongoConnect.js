const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://bucat17:QSWh8cSfDwNbJ0Ly@cluster0.uhugfzo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let db;

async function mongoConnect() {
  try {
    db = client.db("db_NaufalHadi_betest");
    // console.log(db);
  } catch (error) {
    await client.close()
  }
}
function getDB(){
  return db;
}
// class MongoConnect {
//   constructor(uri, databaseName) {
//     this.uri = uri;
//     this.client = new MongoClient(this.uri);
//     this.databaseName = databaseName;
//   }
//   get db() {
//     return this.db;
//   }
//   async setDb() {
//     try {
//       this.db = this.client.db(this.databaseName);
//       console.log(this.db);
//     } catch (error) {
//       await this.client.close();
//     }
//   }
// }
// let mongoConnect = new MongoConnect(uri, "db_NaufalHadi_betest");
module.exports = {mongoConnect, getDB};
