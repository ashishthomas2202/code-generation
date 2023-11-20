require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("./utils/passport");
// Routes Import
const authRoutes = require("./routes/auth");

const port = process.env.SERVER_PORT || 4000;

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// json
app.use(express.json());

// cors
app.use(cors());

// Routes Middleware
app.use("/api/auth", authRoutes);

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// listen on port
app.listen(port, () => {
  console.log("Server is running on port " + port + ".");
});
