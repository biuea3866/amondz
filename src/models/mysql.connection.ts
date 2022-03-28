import { DataSource, DataSourceOptions } from "typeorm";
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from "../config/env.variable";
import { Info } from "./info";
import { Product } from "./product";
import { Like } from "./like";
import { Image } from "./image";
import path from 'path';

const option: DataSourceOptions = {
    type: "mysql",
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    synchronize: false,
    logging: true,
    entities: [Product, Info, Like, Image],
    subscribers: [],
    migrations: []
};

const mysql: DataSource = new DataSource(option);

mysql.initialize()
     .then(response => {
         console.log(`Running mysql`);
     }).catch(error => console.log(error));

export { mysql };     