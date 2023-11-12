import { Inject, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { UserTable, NewUser } from "./users.schema";
import { ResultAsync } from "neverthrow";
import { createResponseMessage } from "shared_types/utils";
import { eq } from "drizzle-orm";

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject("USER_TABLE") private readonly userTable: UserTable
  ) {}

  insertUser(user: NewUser) {
    return ResultAsync.fromPromise(
      this.databaseService.drizzleClient.insert(this.userTable).values(user),
      (error) => {
        console.log(error);
        return createResponseMessage(500, error);
      }
    );
  }

  getUser(userName: string) {
    return ResultAsync.fromPromise(
      this.databaseService.drizzleClient
        .select()
        .from(this.userTable)
        .where(eq(this.userTable.userName, userName)),
      (error) => createResponseMessage(500, error)
    );
  }
}
