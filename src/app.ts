import bodyParser from "body-parser";
import compression from "compression";
import express from 'express';
import { router } from "./routes";

const app: express.Application = express();

app.use(bodyParser.json());

app.use(compression());

app.use(express.urlencoded({ extended: false }));

app.use("/", router);

export { app };