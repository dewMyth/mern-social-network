//Library Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

//Variable Declaration
const app = express();

//Import ROUTES
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

//Database Connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongo Database Connected!");
  }
);

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//ROUTES ENDPOINTS
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.send("WHERE ARE YOU GOING !!! THIS IS BACKEND, YOU SHALL NOT PASS");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    "Backend Server Started on PORT : " + process.env.SERVER_PORT + "!"
  );
});
