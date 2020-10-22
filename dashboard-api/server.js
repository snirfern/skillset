const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

const routes = require("./src/routes/routes")(app);

app.listen(3000, () => console.log(" app listening on port 3000!"));
