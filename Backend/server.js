const app = require("./src/app");

require("dotenv").config();

require("./src/DataBase/Db").connect();

app.listen(process.env.PORT, () => {
  console.log("Server started at port => " + process.env.PORT);
});
