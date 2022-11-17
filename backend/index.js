//Library Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");

//Variable Declaration
const app = express();

app.use(cors());

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

// Public Folder Acces
app.use("/images", express.static(path.join(__dirname, "public/images")));

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//Post Image Upload Route
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     // cb(null, file.originalname);
//     cb(null, req.body.name); //name is the name of the file
//   },
// });

// Multer Firebase Storage
const storage = FirebaseStorage({
  bucketName: process.env.FIREBASE_BUCKET_NAME,
  credentials: {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
  unique: true,
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("postImg"), (req, res) => {
  try {
    const imgPath = JSON.stringify(req.file.path);
    console.log(imgPath);
    return res.status(200).json({
      imgPath,
      message: "Image Uploaded Successfully",
    });
  } catch (err) {
    console.error(err);
  }
});

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
