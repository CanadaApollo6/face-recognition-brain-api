const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { handleRegister } = require("./controllers/register");
const { handleSignIn } = require("./controllers/signin");
const { getProfile } = require("./controllers/profile");
const { updateEntries } = require("./controllers/entries");
const { handleApiCall } = require("./controllers/clarifai");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("The server is running");
});

app.get("/profile/:id", getProfile(db));

app.post("/signin", handleSignIn(db, bcrypt));

app.post("/register", handleRegister(db, bcrypt));

app.put("/entries", updateEntries(db));

app.post("/imageurl", (req, res) => {
  handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000);
