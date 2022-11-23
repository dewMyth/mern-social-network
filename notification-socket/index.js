const io = require("socket.io")(5002, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  // some() ->  tests whether at least one element in the array passes the test implemented by the provided function
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(users);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(
    "A new user connected to notification socket with id : " + socket.id
  );

  // Get event name as "addUser" from the client
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // Send the users array to the client
    io.emit("getUsers", users);
  });

  // Get the notification from the client and Send to specific user/receiver
  socket.on(
    "sendNotification",
    ({ senderId, receiverId, typeOfNotification, post }) => {
      const user = getUser(receiverId); // Get the receiver

      // Send a message to a specific User -> socket.to("socketId").emit()
      io.to(user.socketId).emit("getNotification", {
        senderId,
        typeOfNotification,
        post,
      });
    }
  );

  // Disconnect socket server after user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected from notification socket");
    // removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
