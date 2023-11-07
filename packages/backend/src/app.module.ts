import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
//import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentfulModule } from "./contentful/contentful.module";
import { CoffeesModule } from "./coffees/coffees.module";
import { ConfigModule } from "@nestjs/config";
import { ComponentsModule } from "./components/components.module";
import { AlgoliaModule } from "./algolia/algolia.module";
import { DatabaseModule } from "./database/database.module";
import { IamModule } from "./iam/iam.module";
import { UsersModule } from "./users/users.module";

//TODO make config stuff be pulled in from environment variables at build time
@Module({
  imports: [
    ConfigModule.forRoot(),
    ContentfulModule,
    CoffeesModule,
    ComponentsModule,
    AlgoliaModule,
    DatabaseModule,
    IamModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
