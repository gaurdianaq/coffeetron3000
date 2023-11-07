import { Injectable } from "@nestjs/common";
import { NewUser } from "src/users/users.schema";
import { UsersService } from "src/users/users.service";
import { HashingService } from "../hashing/hashing.service";
import { err, ok } from "neverthrow";
import { createResponseMessage } from "shared_types/utils";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService
  ) {}

  signUp(newUser: NewUser) {
    console.log("signing up, about to hash");
    return this.hashingService
      .hash(newUser.password)
      .andThen((hashedPassword) => {
        console.log("hashed");
        return this.userService.insertUser({
          email: newUser.email,
          userName: newUser.userName,
          password: hashedPassword,
        });
      });
  }

  signIn(userName: string, password: string) {
    return this.userService.getUser(userName).andThen((users) => {
      return this.hashingService
        .compare(password, users[0].password)
        .andThen((isEqual) => {
          if (isEqual) {
            return ok(true);
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
