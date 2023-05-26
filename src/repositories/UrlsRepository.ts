import { Url } from "../entities/Url";
import { database } from "../database/database.config";
import { DataSource, Raw, Repository } from "typeorm";

export class UrlsRepository extends Repository<Url> {
  constructor(private dataSource: DataSource) {
    super(Url, dataSource.createEntityManager());
  }

  async findByHash(hash: string) {
    return this.createQueryBuilder("url")
      .where({ hash })
      .andWhere(Raw((alias) => `${alias}.expiresAt > NOW()`))
      .getOne();
  }
}
