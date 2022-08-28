const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const usersRouter = require("./routes/users");
const blogRouter = require("./routes/blogs");
const propertyRouter = require("./routes/property");
const insuranceRouter = require("./routes/insurance");
const paymentRouter = require("./routes/payments");
const rentingRouter = require("./routes/renting");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");

app.use("/users", usersRouter);
app.use("/property", propertyRouter);
app.use("/blogs", blogRouter);
app.use("/payments", paymentRouter);
app.use("/renting", rentingRouter);
app.use("/insurance", insuranceRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

// Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log(userData);
    socket.join(userData.user_id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      console.log(newMessageRecieved.sender);
      if (user._id == newMessageRecieved.sender.user_id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("new rental request", (rent_request) => {
    socket.in(rent_request.host_id).emit("rental request recieved",rent_request);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData.user_id);
  });
});