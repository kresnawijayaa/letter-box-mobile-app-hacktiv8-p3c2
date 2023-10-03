const Redis = require("redis");
const axios = require("axios");
const cors = require("cors");

const BASEURL_MOVIE = "http://localhost:4002";
const BASEURL_USER = "http://localhost:4001";
const redis = new Redis();

app.use(cors());
app.get("/movies"),
  async (req, res) => {
    try {
      let result = await redis.get("products");

      if (!result) {
        const { data } = await axios.get(BASEURL_MOVIE + "/movies");
        result = data;
        await redis.set("movies", JSON.stringify(data));
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  };
