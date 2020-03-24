const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 2000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to KIX Api");
});

const {
  logregRoutes,
  userRoutes,
  produkRoutes,
  transactionRoutes
} = require("./routes");

app.use("/user", logregRoutes);
app.use("/manage", userRoutes);
app.use("/manage", produkRoutes);
app.use("/trans", transactionRoutes);

app.listen(PORT, () => console.log("API Active on Port", PORT));
