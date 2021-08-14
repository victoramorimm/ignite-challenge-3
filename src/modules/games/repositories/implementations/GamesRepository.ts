import { getConnection, getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }
  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("game")
      .where("game.title ILIKE :title", { title: `%${param}%` })
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) from games");
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    let users: User[] = [];

    const game = await this.repository
      .createQueryBuilder("game")
      .where("game.id = :id", { id })
      .leftJoinAndSelect("game.users", "users")
      .getOne();

    if (!game) {
      throw new Error("Game not found");
    }

    users = game.users;

    return users;
  }
}
