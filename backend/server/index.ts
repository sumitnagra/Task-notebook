import express, { Express } from 'express';
import connectMongo from './db';
import router from './Router/router';
import cors from 'cors';

const port: number = parseInt(process.env.PORT || '8080', 10);
const app: Express = express();

connectMongo();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
