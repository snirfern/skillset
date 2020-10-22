const MongoClient = require("mongodb").MongoClient;

const connectors = {
  skillsset:
    "mongodb+srv://someUser:someUser@cluster0.msxed.mongodb.net/tests?retryWrites=true&w=majority",
};

var db;
var client;

var connector;

module.exports = {
  init: async (currConnection) => {
    return new Promise(async (resolve) => {
      switch (currConnection) {
        case "skillsset": {
          connector = connectors.skillsset;
          break;
        }

        default: {
          console.log("currConnection was not found.");
        }
      }
      try {
        client = await MongoClient.connect(connector, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        db = await client.db("tests");
      } catch (e) {
        console.log(e);
        resolve(-1);
      }
      resolve(1);
    });
  },

  insertItem: async (collection, item) => {
    return new Promise(async (resolve) => {
      try {
        const doesExist = await db
          .collection(collection)
          .find({ email: item.email })
          .toArray();
        if (!doesExist || (Array.isArray(doesExist) && doesExist.length === 0))
          item.id = new Date().valueOf();
        else item.id = doesExist[0].id;
        const insertionRes = await db
          .collection(collection)
          .insertOne({ ...item });
        resolve(item ? item : -1);

        client.close();
      } catch (e) {
        client.close();
        resolve(-1);
      }
    });
  },

  getItems: async (collection) => {
    return new Promise(async (resolve) => {
      try {
        const getItemsRes = await db.collection(collection).find().toArray();
        resolve(getItemsRes);
        client.close();

        return;
      } catch (e) {
        console.log(e);
        resolve([]);
      }
    });
  },
};
