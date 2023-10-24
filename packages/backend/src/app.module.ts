import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
//import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentfulModule } from "./contentful/contentful.module";
import { CoffeesModule } from "./coffees/coffees.module";
import { ConfigModule } from "@nestjs/config";
import { ComponentsModule } from './components/components.module';
import { AlgoliaModule } from './algolia/algolia.module';

//TODO make config stuff be pulled in from environment variables at build time
@Module({
  imports: [
    ConfigModule.forRoot(),
    ContentfulModule,
    CoffeesModule,
    ComponentsModule,
    AlgoliaModule,
    /*
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "somepassword",
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true, //disable this in production
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
