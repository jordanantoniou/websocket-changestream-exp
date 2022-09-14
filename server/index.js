import express from 'express';
import http from 'http';
import { connectToDatabase } from './helpers/mongo.js';
import { configureSocketHandlers } from './helpers/sockets.js';

// Don't actually need express here as we could use a http server alone however kept in for future potential use.
const app = express();
const server = http.createServer(app);

connectToDatabase();

configureSocketHandlers(server);

server.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...')
});