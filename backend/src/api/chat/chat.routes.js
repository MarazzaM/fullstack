const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { getMessages, getMessagesByEmail } = require('./chat.services'); 

const router = express.Router();

// Route to get all messages for the authenticated user
router.get('/messages', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;

    const messages = await getMessages(userId);

    res.json({ messages });
  } catch (err) {
    next(err);
  }
});

// Route to get messages for a specific user by email
router.get('/messages/:email', isAuthenticated, async (req, res, next) => {
  try {
    const { email } = req.params;

    const messages = await getMessagesByEmail(email);

    res.json({ messages });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
