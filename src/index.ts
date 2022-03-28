import express from 'express';
import { app } from './app';
import { PORT } from './config/env.variable';

class Server {
    private PORT: number;
    private app: express.Application;

    constructor(
        PORT: number,
        app: express.Application
    ) {
        this.PORT = PORT;
        this.app = app;
    }

    public async start(): Promise<void> {
        this.app.listen(this.PORT, () => {
            console.log(`Running Server on ${this.PORT}`);
        });
    }
}

const server = async (PORT: number, app: express.Application) => await new Server(PORT, app).start();

server(PORT, app);