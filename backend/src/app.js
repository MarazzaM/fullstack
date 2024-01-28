const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const setupWebSocketServer = require('./ws/websocket');

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Set up WebSocket server
setupWebSocketServer(server);

module.exports = server;
