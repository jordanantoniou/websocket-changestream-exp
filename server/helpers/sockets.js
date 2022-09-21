import { Server } from 'socket.io';
import { configureChangeStreamHandlers, findAll } from './mongo.js';

const onConnectionHandler = (io) => {
    io.on('connection', async () => {

        console.log('Client connected...');

        configureChangeStreamHandlers(io);

    });
}

const onDisconnectHandler = (io) => {
    io.on('disconnect', async () => {
        console.log('Client disconnected...')
    });
}

const configureSocketHandlers = (server) => {
    const io = new Server(server, {
        cors: '*',
        methods: ['GET', 'POST']
    });

    onConnectionHandler(io);
    onDisconnectHandler(io);
}

export { configureSocketHandlers }