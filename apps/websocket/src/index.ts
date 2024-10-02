import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import prisma from '@repo/db/client';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

interface Connections {
  chatbotId: string;
  visitorId: string;
  isVisitor: boolean;
  socketId: string;
}

let connections: Connections[] = [];

io.on("connection", (socket) => {
  // Register the connection with chatbotId, visitorId, and isVisitor status
  socket.on("register", (chatbotId2 , visitorId2, isVisitor2) => {
    connections = connections.filter(({chatbotId, visitorId, isVisitor})=>{
      return (chatbotId !== chatbotId2) || (visitorId !== visitorId2) || (isVisitor !== isVisitor2)
    })
    connections.push({ socketId: socket.id, chatbotId: chatbotId2, visitorId: visitorId2, isVisitor: isVisitor2 });
    socket.emit("registered", { id: socket.id, chatbotId: chatbotId2, visitorId: visitorId2, isVisitor: isVisitor2 });
  });

  // Handle private messaging between the visitor and the other client
  socket.on("private_message", async ({ chatbotId, visitorId, isVisitor, content }) => {
    console.log("the number of connections is ", connections.length)
    console.log(connections)
    const targetConnection = connections.find((conn) => 
      conn.chatbotId === chatbotId && 
      conn.visitorId === visitorId && 
      conn.isVisitor !== isVisitor // Find the opposite role (visitor/non-visitor)
    );
    

    if (targetConnection) {
      // Send the message to the target client's socket ID
      io.to(targetConnection.socketId).emit("receive_message", {
        content ,chatbotId, visitorId, isSentByVisitor: isVisitor
      });
    await prisma.message.create({data:{
      content: content,
      isSentByVisitor: isVisitor,
      chatbotId: chatbotId,
      visitorId: visitorId
    }})
      console.log("Message sent to", targetConnection.socketId);
    } else {
      console.log("Target not found for private message ");
    }
  });

  // Handle disconnection and remove the client from the connections array
  socket.on("disconnect", () => {
    const index = connections.findIndex((conn) => conn.socketId === socket.id);
    if (index !== -1) {
      const disconnectedUser = connections.splice(index, 1);
      console.log("User disconnected", disconnectedUser);
    }
  });
});

httpServer.listen(8080, () => {
  console.log("Server is running on port 8080");
});
