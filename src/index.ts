import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = express()

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(Number(PORT), HOST, () => {
    console.log(`"Online on http://${HOST}:${PORT}"`)
})
