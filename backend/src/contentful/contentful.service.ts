import { Inject, Injectable } from "@nestjs/common";
import {
  ChainModifiers,
  ContentfulClientApi,
  EntriesQueries,
  Entry,
  EntryCollection,
  EntryQueries,
  EntrySkeletonType,
  createClient,
} from "contentful";
import contentfulConfig from "./config/contentfulConfig";
import { ConfigType } from "@nestjs/config";

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

  getEntry<T extends EntrySkeletonType, Modifiers extends ChainModifiers>(
    entryID: string,
    query?: EntryQueries<Modifiers>
  ): Promise<Entry<T>> {
    return this.client.getEntry<T, Modifiers>(entryID, query);
  }

  getEntries<T extends EntrySkeletonType, Modifiers extends ChainModifiers>(
    query: EntriesQueries<T, Modifiers>
  ): Promise<EntryCollection<T>> {
    return this.client.getEntries<T, Modifiers>(query);
  }
}
