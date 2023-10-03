const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://kresnawijaya511:BQg6VrtZvnX33AP4@hacktiv8-db.hhzetpi.mongodb.net/?retryWrites=true&w=majority";

let db = null;

async function connect() {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const database = client.db("users-db");
    db = database;
    return database;
  } catch (error) {
    console.log(error);
    return error;
  }
}

function getDatabase() {
  return db;
}

module.exports = {
  connect,
  getDatabase,
};
