import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Client } from "pg";
import { ResultAsync } from "neverthrow";
import { drizzle } from "drizzle-orm/node-postgres";

@Injectable()
export class DatabaseService {
  readonly drizzleClient;

  constructor(
    @Inject("DATABASE_CLIENT")
    private readonly dbClient: Client
  ) {
    this.drizzleClient = drizzle(this.dbClient);
  }
}
