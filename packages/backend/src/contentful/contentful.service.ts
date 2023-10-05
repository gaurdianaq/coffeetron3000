import { Inject, Injectable } from "@nestjs/common";
import {
  ChainModifiers,
  ContentfulClientApi,
  EntriesQueries,
  EntryQueries,
  EntrySkeletonType,
  createClient,
} from "contentful";
import contentfulConfig from "./config/contentfulConfig";
import { ConfigType } from "@nestjs/config";
import { Entry, EntryCollection } from "shared_types/contentfulTypes";

@Injectable()
export class ContentfulService {
  private readonly client: ContentfulClientApi<undefined>;
  constructor(
    @Inject(contentfulConfig.KEY)
    private contentfulConfiguration: ConfigType<typeof contentfulConfig>
  ) {
    this.client = createClient(this.contentfulConfiguration);
    console.log("initializing contentful service");
  }

  getEntry<T>(
    entryID: string,
    query?: EntryQueries<undefined>
  ): Promise<Entry<T>> {
    return this.client.getEntry(entryID, query) as Promise<Entry<T>>;
  }

  getEntries<T>(
    query: EntriesQueries<EntrySkeletonType, undefined>
  ): Promise<EntryCollection<T>> {
    return this.client.getEntries(query) as Promise<EntryCollection<T>>;
  }
}
