const { db } = require('../../utils/db');

// Function to get messages for a user
const getMessages = async () => {
    try {
      const messages = await db.message.findMany({
        orderBy: {
          timestamp: 'asc', 
        },
      });
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  };
  
  module.exports = {
    getMessages,
  };
  

// Function to save a new message
const saveMessage = async (userId, content) => {
  try {
    // Implement the logic to save a new message to the database
    const savedMessage = await db.message.create({
      data: {
        userId,
        content,
      },
    });

    return savedMessage;
  } catch (error) {
    throw error;
  }
};

const getMessagesByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const messages = await db.message.findMany({
      where: { sender: email }, 
      orderBy: {
        timestamp: 'asc',
      },
    });

    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

module.exports = {
  getMessagesByEmail,
};
module.exports = { getMessages, saveMessage, getMessagesByEmail };
