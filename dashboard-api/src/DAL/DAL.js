const mongo = require("../mongodb/mongodb");
const models = require("../models/models");
module.exports = {
  getComments: async (userID) => {
    try {
      let initRes = await mongo.init("skillsset");
      if (!initRes || initRes < 0) return "-1";
      const comments = await mongo.getItems("skillsset");
      return comments && comments !== -1 ? comments : "-1";
    } catch (e) {
      console.log(e);
      return "-1";
    }
  },
  addComment: async (user, comment) => {
    try {
      let commentModel = models.comments();
      commentModel.email = user;
      commentModel.message = comment;
      let initRes = await mongo.init("skillsset");
      if (!initRes || initRes < 0) return "-1";
      const insertionRes = await mongo.insertItem("skillsset", commentModel);
      return insertionRes;
    } catch (e) {
      console.log(e);
      return "-1";
    }
  },
};
