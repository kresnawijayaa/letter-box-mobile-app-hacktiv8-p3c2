if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4001;

const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 19839,
  password: process.env.REDIS_PASSWORD,
});

const cors = require("cors");
const { connect } = require("./config/mongodb");
const Controller = require("./controllers");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World AAA!");
});

app.use("/keys", async (req, res) => {
  try {
    const keys = await redis.keys("*");
    res.json(keys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", Controller.findAll);
app.get("/users/:id", Controller.findById);
app.post("/users", Controller.create);
app.delete("/users/:id", Controller.delete);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed connect to DB");
  });
