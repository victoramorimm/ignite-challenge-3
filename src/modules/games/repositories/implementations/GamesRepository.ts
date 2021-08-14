import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }
  countAllGames(): Promise<[{ count: string }]> {
    throw new Error("Method not implemented.");
  }
  findUsersByGameId(id: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("game")
      .where("game.title ILIKE :title", { title: `%${param}%` })
      .getMany();
  }

  // async countAllGames(): Promise<[{ count: string }]> {
  //   return this.repository.query(); // Complete usando raw query
  // }

  // async findUsersByGameId(id: string): Promise<User[]> {
  //   return this.repository.createQueryBuilder();
  //   // Complete usando query builder
  // }
}
