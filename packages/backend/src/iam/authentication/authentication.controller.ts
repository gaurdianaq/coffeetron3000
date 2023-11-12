import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { NewUser } from "src/users/users.schema";
import { LoginData } from "./authentication.types";
import { AuthenticationService } from "./authentication.service";
import { Response } from "express";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post("sign-up")
  signUp(@Body() newUser: NewUser) {
    return this.authService.signUp(newUser).match(
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
  signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() loginData: LoginData
  ) {
    return this.authService.signIn(loginData).match(
      (token) => {
        console.log("setting token");
        response.cookie("accessToken", token, {
          httpOnly: true,
          secure: false,
          domain: "http://127.0.0.1",
        });

        return {
          message: "User successfully signed in",
        };
      },
      (error) => {
        throw new HttpException(error.message, error.statusCode);
      }
    );
  }
}
