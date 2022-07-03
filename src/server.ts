import "reflect-metadata";
import express from "express";
import myDataSource from "../data-source";
import { routes } from "./routes";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const port = 3000;
app.use(routes)

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.listen(port, () => {
  console.log("Server is runnig, on port:", port);
});
