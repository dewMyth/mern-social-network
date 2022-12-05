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
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

//Import ROUTES
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const notificationRoute = require("./routes/notifications");

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
app.use(express.static(path.join(__dirname, "client")));
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
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/notification", notificationRoute);

app.get("/", (req, res) => {
  res.send("WHERE ARE YOU GOING !!! THIS IS BACKEND, YOU SHALL NOT PASS");
});

// Messaging Socket Server

let users = [];

const addUser = (userId, socketId) => {
  // some() ->  tests whether at least one element in the array passes the test implemented by the provided function
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log("users => ", users);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A new user connected with id : " + socket.id);
  // To Send a Event to All Clients -> io.emit()
  //   io.emit("message", "Hello from server");

  // To Send a Event to a Single Client -> socket.emit("eventName(ex:"msg")", "Event functinality(ex: message body as string)");
  // To do that Take the userId and socketId from the client

  // To get something sent by the Client -> socket.on()
  socket.on("addUser", (userId) => {
    console.log("userId => ", userId);
    console.log("socket.id => ", socket.id);
    addUser(userId, socket.id);
    // Send the users array to the client
    io.emit("getUsers", users);
  });

  // Get the message from the client and Send to specific user/receiver
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("recieverId => ", receiverId);
    console.log("senderId => ", senderId);
    console.log("text => ", text);
    const user = getUser(receiverId); // Get the receiver
    // Send a message to a specific User -> socket.to("socketId").emit()
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log("User not online!");
    }
  });

  // Notification Socket Handling
  socket.on(
    "sendNotification",
    ({ senderId, receiverId, typeOfNotification, post }) => {
      const user = getUser(receiverId); // Get the receiver
      if (user) {
        io.to(user.socketId).emit("getNotification", {
          senderId,
          typeOfNotification,
          post,
        });
      } else {
        console.log("User not online!");
      }
    }
  );

  // Disconnect socket server after user disconnects (moved away from conversation)
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// End Messaging Socket Server

server.listen(process.env.PORT, () => {
  console.log("Backend Server Started on PORT : " + process.env.PORT + "!");
});
