if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const cors = require("cors");

const publics = require("./routes/publics");
const users = require("./routes/users");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const casts = require("./routes/casts");
const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Temennya Kresna!");
});
app.use("/pub", publics);
app.use("/users", users);
// app.use(authentication);
app.use("/genres", genres);
app.use("/movies", movies);
app.use("/casts", casts);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port} `);
});

module.exports = app;
