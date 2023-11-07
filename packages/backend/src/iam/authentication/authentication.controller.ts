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
import { AuthenticationService } from "./authentication.service";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post("sign-up")
  signUp(@Body() newUser: NewUser) {
    console.log("user signing up");
    console.log(newUser);
    return this.authService.signUp(newUser).match(
      () => {
        console.log("success");
        return {
          message: "User successfully signed up",
        };
      },
      (error) => {
        console.log(error);
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(@Body() loginData: LoginData) {}
}
