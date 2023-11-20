const express = require("express");
const app = express();
const cors = require("cors");
// Routes Import
const authRoutes = require("./routes/auth");

const port = 4000;

// json
app.use(express.json());

// cors
app.use(cors());

app.use("/api/auth", authRoutes);

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// listen on port
app.listen(port, () => {
  console.log("Server is running on port " + port + ".");
});
