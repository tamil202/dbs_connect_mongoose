// mongo.js
const { MongoClient,ObjectId } = require("mongodb");


const getDatabase = async () => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://fury:mnm@cluster0.6lai5xn.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`database connected`);
    return client.db("programs");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { getDatabase, ObjectId };
