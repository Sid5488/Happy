import express, { Application } from 'express';
import cors from 'cors';
import { join } from 'path';
import 'express-async-errors';

import './database';
import routes from './routes';
import errorHandler from './errors/handler';

class App {
    public server: Application;

    constructor() {
        this.server = express();

        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use('/uploads', express.static(
            join(__dirname, '..', 'tmp', 'uploads')
        ));
        this.server.use(errorHandler);
    }

    private routes(): void {
        this.server.use(routes);
    }
}

export default new App().server;
