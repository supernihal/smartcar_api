import bodyParser from "body-parser";
import http from "http";
import express, { Application } from "express";
import { createHttpTerminator } from "http-terminator";
import router from "./src/routes";
import "./src/process";

const app: Application = express();
const port = process.env.PORT || 3000;
export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({
  server,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
