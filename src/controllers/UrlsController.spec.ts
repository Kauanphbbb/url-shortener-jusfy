import { Request, Response } from "express";
import { UrlsService } from "../services/UrlsService";
import { UrlsController } from "./UrlsController";

describe("UrlsController", () => {
  let sut = <UrlsController>{};
  const mockUrlsService = <UrlsService>{};
  let request: Request;
  let response: Response;

  beforeEach(() => {
    sut = new UrlsController(mockUrlsService);

    request = {
      params: {},
      body: {},
    } as any;

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
    } as any;
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  describe("findByHash", () => {
    it("should return 404 if url is not found", async () => {
      mockUrlsService.findByHash = jest.fn().mockResolvedValue(null);
      await sut.findByHash(request, response);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ error: "Url not found" });
    });

    it("should return 200 and redirect to url if url is found", async () => {
      const url = { url: "http://url.com" };
      mockUrlsService.findByHash = jest.fn().mockResolvedValue(url);
      await sut.findByHash(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.redirect).toHaveBeenCalledWith(url.url);
    });
  });

  describe("saveUrl", () => {
    it("should return 400 if url is not provided", async () => {
      await sut.saveUrl(request, response);
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({ error: "Url is required" });
    });

    it("should return 200 and the new url", async () => {
      const url = { url: "http://url.com", hash: "hash" };
      mockUrlsService.saveUrl = jest.fn().mockResolvedValue(url);
      request.body = url;
      await sut.saveUrl(request, response);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toBeCalledWith({
        original: url.url,
        short: url.hash,
      });
    });
  });
});
