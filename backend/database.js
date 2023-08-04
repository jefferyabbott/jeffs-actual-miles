import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('DISTANCE DATABASE CONNECTED!');
});

