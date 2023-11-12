import { Inject, Injectable } from "@nestjs/common";
import { NewUser } from "src/users/users.schema";
import { UsersService } from "src/users/users.service";
import { HashingService } from "../hashing/hashing.service";
import { ResultAsync, err, ok } from "neverthrow";
import { createResponseMessage } from "shared_types/utils";
import { LoginData } from "./authentication.types";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) // 👈
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  signUp(newUser: NewUser) {
    return this.hashingService
      .hash(newUser.password)
      .andThen((hashedPassword) => {
        return this.userService.insertUser({
          email: newUser.email,
          userName: newUser.userName,
          password: hashedPassword,
        });
      });
  }

  signIn(loginData: LoginData) {
    return this.userService.getUser(loginData.userName).andThen((users) => {
      return this.hashingService
        .compare(loginData.password, users[0].password)
        .andThen((isEqual) => {
          if (isEqual) {
            return ResultAsync.fromPromise(
              this.jwtService.signAsync(
                {
                  sub: users[0].id,
                  email: users[0].email,
                },
                {
                  audience: this.jwtConfiguration.audience,
                  issuer: this.jwtConfiguration.issuer,
                  secret: this.jwtConfiguration.secret,
                  expiresIn: this.jwtConfiguration.accessTokenTtl,
                }
              ),
              (error) => {
                return createResponseMessage(500, error);
              }
            );
          }
          return err(
            createResponseMessage(
              401,
              "Invalid credentials, please check your username/password"
            )
          );
        });
    });
  }
}
