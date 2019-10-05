const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

const { mongoose } = require("./database");

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json()); // I can recieve data through req.body

//Routes
app.use("/api/task", require("./routes/task.routes"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Starting server
app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});
