import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { databaseConfig } from "./config/databaseConfig";
import { Client } from "pg";

@Module({
  providers: [
    {
      provide: "DATABASE_CLIENT",
      useFactory: async () => {
        return await new Client({
          host: databaseConfig.dbHost || "localhost",
          port: databaseConfig.dbPort,
          user: databaseConfig.dbUser,
          password: databaseConfig.dbPassword,
          database: databaseConfig.dbName,
        });
      },
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
