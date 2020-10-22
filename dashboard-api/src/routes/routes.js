const DAL = require("../DAL/DAL");
module.exports = function (app) {
  app.post("/addComment", async (req, res) => {
    const { user, comment } = req.body;
    addCommentRes = await DAL.addComment(user, comment);
    res.send(addCommentRes);
  });

  app.get("/getComments", async (req, res) => {
    const { userID } = req.query;
    const comments = await DAL.getComments(userID);
    res.send(comments);
  });
};
