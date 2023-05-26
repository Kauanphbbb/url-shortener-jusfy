import { LessThan, Raw } from "typeorm";
import { UrlsRepository } from "../repositories/UrlsRepository";

export class UrlsService {
  constructor(private urlsRepository: UrlsRepository) {}
  async findByHash(hash: string) {
    return await this.urlsRepository.findByHash(hash);
  }
  async saveUrl(url: string) {
    let hash = this.generateHash();
    const hashAlreadyExists = await this.urlsRepository.findOneBy({ hash });
    
    while (hashAlreadyExists) {
      hash = this.generateHash();
    }

    const expiresAt = this.todayPlusFiveMinutes();
    return await this.urlsRepository.save({ url, hash, expiresAt });
  }

  private generateHash() {
    const permittedChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let hash = "";
    for (let i = 0; i < 6; i++) {
      hash += permittedChars.charAt(
        Math.floor(Math.random() * permittedChars.length)
      );
    }
    return hash;
  }

  private todayPlusFiveMinutes() {
    const today = new Date();
    return new Date(today.setMinutes(today.getMinutes() + 5));
  }
}
