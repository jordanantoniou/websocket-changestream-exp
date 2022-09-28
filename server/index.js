import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { connectToDatabase, configureChangeStreamHandlers, findAll } from './helpers/mongo.js';
import { configureSocketHandlers } from './helpers/sockets.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: '*',
  methods: ['GET', 'POST']
});

app.use(cors());

app.get('/messages', async (req, res) => {

  const messages = await findAll();

  res.send(messages);
});

connectToDatabase();

configureChangeStreamHandlers(io);

configureSocketHandlers(io);

server.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...')
});