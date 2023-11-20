const express = require("express");
const app = express();
const cors = require("cors");

const post = 3000;

// json
app.use(express.json());

// cors
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// listen on port
app.listen(port, () => {
  console.log("Server is running on port " + port + ".");
});
