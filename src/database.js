const mongoose = require("mongoose");

const URI = "mongodb://localhost/mern-tasks";

mongoose
  .connect(URI, { useNewUrlParser: true })
  .then(() => {
    console.log("DB Connected");
  })
  .catch(err => console.log(err));

module.exports = mongoose;
