import { DataSource } from "typeorm";
import { Url } from "../entities/Url";

export const database = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Url],
  synchronize: true,
});

