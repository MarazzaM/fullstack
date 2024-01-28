const socketIo = require('socket.io');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function setupWebSocketServer(server) {
  const io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL, 
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket.io client connected');

    socket.on('message', async (message) => {
      console.log(`Received Socket.io message: ${message}`);
    
      // Save the message to the database using Prisma
      const savedMessage = await prisma.message.create({
        data: {
          content: message.content, // Assuming message.content is the actual message string
          sender: message.sender,   // Assuming message.sender is the sender string
        },
      });
    
      // Emit the saved message to all clients
      io.emit('message', savedMessage);
    });
    

    socket.on('disconnect', () => {
      console.log('Socket.io client disconnected');
    });
  });
}

module.exports = setupWebSocketServer;
