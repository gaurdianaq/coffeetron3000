import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { NewUser } from "src/users/users.schema";
import { LoginData } from "./authentication.types";
import { UsersService } from "src/users/users.service";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly usersService: UsersService) {}

  @Post("sign-up")
  signUp(@Body() newUser: NewUser) {
    this.usersService.insertUser(newUser).match(
      () => {
        return {
          message: "User successfully signed up",
        };
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(@Body() loginData: LoginData) {}
}
