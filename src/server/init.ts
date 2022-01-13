import express from 'express';
import * as fs from 'fs';
import { registerMiddleware } from '../middlewares/jwt.middleware';
import bodyParser from 'body-parser';


export const initServer = async () =>{
    const server = express();

    server.use(bodyParser.json());

    registerMiddleware(server);

    await initRoutes(server);

    server.listen(5000 || process.env.PORT, () => {
        console.log('Server running, and receved request');
    })
};

export const initRoutes = async(server) =>{
    fs.readdirSync('./src/routes').forEach(async folder => {
        const {init} = require('../routes/'+folder);

        await init(server);

        console.log(`Register routes of ${folder}`);
    });
}
