import { Inject, Injectable } from "@nestjs/common";
import {
  ContentfulClientApi,
  EntriesQueries,
  EntryQueries,
  EntrySkeletonType,
  createClient,
} from "contentful";
import contentfulConfig from "./config/contentfulConfig";
import { ConfigType } from "@nestjs/config";
import { Entry, EntryCollection } from "shared_types/contentfulTypes";
import { ResultAsync } from "neverthrow";
import { TAPIError } from "shared_types/types";
import { createError } from "shared_types/utils";

@Injectable()
export class ContentfulService {
  private readonly client: ContentfulClientApi<undefined>;
  constructor(
    @Inject(contentfulConfig.KEY)
    private contentfulConfiguration: ConfigType<typeof contentfulConfig>
  ) {
    this.client = createClient(this.contentfulConfiguration);
  }

  getEntry<T>(
    entryID: string,
    query?: EntryQueries<undefined>
  ): ResultAsync<Entry<T>, TAPIError> {
    return ResultAsync.fromPromise(
      this.client.getEntry(entryID, query) as Promise<Entry<T>>,
      (error) => {
        return createError(400, error);
      }
    );
  }

  getEntries<T>(
    query: EntriesQueries<EntrySkeletonType, undefined>
  ): ResultAsync<EntryCollection<T>, TAPIError> {
    return ResultAsync.fromPromise(
      this.client.getEntries(query) as Promise<EntryCollection<T>>,
      (error) => {
        return createError(400, error);
      }
    );
  }
}
