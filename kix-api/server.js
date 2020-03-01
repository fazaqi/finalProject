const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 2000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to KIX Api");
});

const { logresRoutes, userRoutes } = require("./routes");

app.use("/user", logresRoutes);
app.use("/manage", userRoutes);

app.listen(PORT, () => console.log("API Active on Port", PORT));
