import mongoose, { connect, disconnect } from "mongoose";

async function dbConnect(uri_db: string) {
  const DB_URI = <string>uri_db;
  const conn = await connect(`${DB_URI}`);
  console.log("collections -->", conn.models);
}

async function dbDisconnect() {
  await disconnect();
}

async function dropCollections(collections: string) {
  const db = mongoose.connection;
  try {
    console.log("delete " + collections);
    await db.dropCollection(`${collections}`);
  } catch (error) {
    console.log(error);
  }
}

export { dbConnect, dbDisconnect, dropCollections };
