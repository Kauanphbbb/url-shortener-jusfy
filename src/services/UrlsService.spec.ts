import { UrlsService } from "./UrlsService";
import { Url } from "../entities/Url";
import { UrlsRepository } from "../repositories/UrlsRepository";

// Tests for UrlsService
describe("UrlsService", () => {
  let sut = <UrlsService>{};
  let mockUrlsRepository = <UrlsRepository>{};
  beforeEach(() => {
    sut = new UrlsService(mockUrlsRepository);
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  describe("findByHash", () => {
    it("should call findByHash from urlsRepository", async () => {
      const mockUrl = <Url>{};
      mockUrlsRepository.findByHash = jest.fn().mockResolvedValue(mockUrl);
      await sut.findByHash("any_hash");
      expect(mockUrlsRepository.findByHash).toHaveBeenCalledWith("any_hash");
    });
  });

  describe("saveUrl", () => {
    it("should create save a new hash url and create a expire date of five minutes", async () => {
      const mockUrl = <Url>{};

      mockUrlsRepository.findOneBy = jest.fn().mockResolvedValue(null);
      mockUrlsRepository.save = jest.fn().mockResolvedValue(mockUrl);

      await sut.saveUrl("any_url");

      expect(mockUrlsRepository.save).toHaveBeenCalledWith({
        url: "any_url",
        hash: expect.any(String),
        expiresAt: expect.any(Date),
      });
    });
  });
});
