import { findAll } from './mongo.js';

const onConnectionHandler = (io) => {
    io.on('connection', async (socket) => {
        console.log('Client connected...');
        onFetchInitialData(socket);
    });
}

const onDisconnectHandler = (io) => {
    io.on('disconnect', async () => {
        console.log('Client disconnected...')
    });
}

const onFetchInitialData = (socket) => {
    socket.on('fetchInitialData', async () => {
        console.log('Fetching data...')

        const messages = await findAll();

        if (messages) socket.emit('messages', messages);
    });
}

const configureSocketHandlers = (io) => {

    onConnectionHandler(io);
    onDisconnectHandler(io);
}

export { configureSocketHandlers }