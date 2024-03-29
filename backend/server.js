//**************** imports ****************//
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDatabase from "./config/configDatabase.js";
import Template from "./template.js";

//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});
colors.enable();

//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const API_URL = process.env.API_ENV || "/api/v1.0/";

//**************** connect to database ****************//
connectDatabase();
//**************** middleware****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());


//**************** app listening ****************//
const server = app.listen(PORT, () => {
    console.log(`The server is listening at - http://127.0.0.1:${PORT}${API_URL} in ${NODE_ENV} mode🔥`.yellow);
});

//**************** routes****************//
app.get('/api/v1.0/', (req, res) => {
    res.send(Template());
});