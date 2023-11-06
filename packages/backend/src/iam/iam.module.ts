import { Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [UsersModule],
  providers: [HashingService, AuthenticationService],
  controllers: [AuthenticationController],
})
export class IamModule {}
