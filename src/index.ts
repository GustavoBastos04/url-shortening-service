import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router';

dotenv.config();

const MONGO_URL: string = process.env.MONGO_URL || '';
const HOST: string = process.env.HOST || '';
const PORT: string = process.env.PORT || '';

const app = express()

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());

app.use(express.json());
app.use('/', router());

const server = http.createServer(app);

server.listen(Number(PORT), HOST, () => {
    console.log(`"Online on http://${HOST}:${PORT}"`)
})

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));
