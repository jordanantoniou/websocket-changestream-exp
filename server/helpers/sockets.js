const onConnectionHandler = (io) => {
    io.on('connection', async () => {

        console.log('Client connected...');
    });
}

const onDisconnectHandler = (io) => {
    io.on('disconnect', async () => {
        console.log('Client disconnected...')
    });
}

const configureSocketHandlers = (io) => {

    onConnectionHandler(io);
    onDisconnectHandler(io);
}

export { configureSocketHandlers }