import { Server } from "socket.io";
import allowedOrigin from "./allowedOrigin.js";

// const corsOptions ={
//   origin: allowedOrigin, 
//   credentials:true,
//   optionSuccessStatus:200,
//   sameSite:'none',
//   secure:true,
// }
// app.use(cors(corsOptions));

const io = new Server({
  cors: {
    origin: allowedOrigin, 
    credentials:true,
    optionSuccessStatus:200,
    sameSite:'none',
    secure:true,
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("4000");