import { Request, Response } from "express";
import { UrlsService } from "../services/UrlsService";

export class UrlsController {
  constructor(private urlsService: UrlsService) {}

  async findByHash(req: Request, res: Response) {
    const { hash } = req.params;
    const url = await this.urlsService.findByHash(hash);
    if (!url) {
      return res.status(404).json({ error: "Url not found" });
    }
    return res.status(200).redirect(url.url);
  }

  async saveUrl(req: Request, res: Response) {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Url is required" });
    }
    const newUrl = await this.urlsService.saveUrl(url);
    return res.status(201).json({ original: newUrl.url, short: newUrl.hash });
  }
}
