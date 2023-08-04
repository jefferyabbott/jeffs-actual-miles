import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import './database.js';
import Distance from './models/DistanceModel.js';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cors({origin: '*'}));

app.get('/', async (req, res) => {
    const exercises = await Distance.find({});

    return res.status(200).send(exercises);
});

app.post('/stats', async (req, res) => {
    const {
        key, day, exercise, distance
    } = req.body;

    if (key !== process.env.KEY) {
        return res.status(401).send('not authorized');
    }

    await Distance.create({day, exercise, distance});

    return res.status(200).send('data posted');
});

const httpsServer = https.createServer({
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  }, app);

httpsServer.listen(process.env.PORT, () => {
    console.log(`The server has started on port ${process.env.PORT}.`);
});
