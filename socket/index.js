const io = require("socket.io")(5001, {
  cors: {
    origin: "http://localhost:3000",
  },
});

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
    addUser(userId, socket.id);
    // Send the users array to the client
    io.emit("getUsers", users);
  });

  // Get the message from the client and Send to specific user/receiver
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId); // Get the receiver
    // Send a message to a specific User -> socket.to("socketId").emit()
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // Disconnect socket server after user disconnects (moved away from conversation)
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
