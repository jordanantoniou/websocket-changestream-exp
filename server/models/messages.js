import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
    type: String,
    level: String,
    room: String,
    sensor: String,
    message: String
});

const Message = mongoose.model('Message', schema);

export { Message };
