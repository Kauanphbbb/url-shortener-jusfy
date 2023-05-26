import { Router } from "express";
import { UrlsController } from "../controllers/UrlsController";
import { UrlsService } from "../services/UrlsService";
import { UrlsRepository } from "../repositories/UrlsRepository";
import { database } from "../database/database.config";

const urlRoutes = Router();
const urlsController = new UrlsController(new UrlsService(new UrlsRepository(database)));

urlRoutes.post("/urls", (req, res) => urlsController.saveUrl(req, res));
urlRoutes.get("/urls/:hash", (req, res) => urlsController.findByHash(req, res));

export { urlRoutes };
