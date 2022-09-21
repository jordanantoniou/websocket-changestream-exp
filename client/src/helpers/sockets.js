import { io } from 'socket.io-client';

let socket;

export const initiateSocketConnection = () => {
    socket = io('http://localhost:8080');
    console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
};

export const onMessageHandler = (setMessages) => {
    socket.on('message', (message) => {
        setMessages(current => [...current, message]);
    });
};