import mongoose from 'mongoose';
import { Message } from '../models/messages.js';
import * as dotenv from 'dotenv'
dotenv.config()

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToDatabase = () => {

    try {

        mongoose.connect(process.env.MONGODB_URL, connectionParams);

        console.log('Database connected successfully');

    } catch (error) {

        console.log(error);

        console.log('Database connection failed')

    }
};

const configureChangeStreamHandlers = (io) => {
    Message.watch().on('change', ({ fullDocument }) => {
        if (fullDocument) io.emit('message', fullDocument);
    });
}

const findAll = async () => {
    return Message.find({});
}

export { connectToDatabase, configureChangeStreamHandlers, findAll };
