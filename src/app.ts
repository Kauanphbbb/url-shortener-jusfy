import "dotenv/config";
import express from "express";
import cors from "cors";
import { database } from "./database/database.config";
import { urlRoutes } from "./routes/urls.routes";

class App {
  public server: express.Application;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routes(): void {
    this.server.use(urlRoutes);
  }

  private database(): void {
    database
      .initialize()
      .then(() => {
        console.log("Database connected");
      })
      .catch((error) => {
        console.log("Database connection failed");
        console.log(error);
      });
  }
}

export default new App().server;
