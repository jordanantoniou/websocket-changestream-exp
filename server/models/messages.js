import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
    room: String,
    alert: String,
    alertTime: Date,
    zone: String,
    muted: String
});

const Message = mongoose.model('Message', schema);

export { Message };
