import { Inject, Injectable } from "@nestjs/common";
import {
  ChainModifiers,
  ContentfulClientApi,
  Entry,
  EntryCollection,
  EntryQueries,
  EntrySkeletonType,
  createClient,
} from "contentful";
import contentfulConfig from "./config/contentfulConfig";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class ContentfulService<
  T extends EntrySkeletonType,
  Modifiers extends ChainModifiers,
> {
  private readonly client: ContentfulClientApi<undefined>;
  constructor(
    @Inject(contentfulConfig.KEY)
    private contentfulConfiguration: ConfigType<typeof contentfulConfig>
  ) {
    this.client = createClient(this.contentfulConfiguration);
  }

  getEntry(
    entryID: string,
    query?: EntryQueries<Modifiers>
  ): Promise<Entry<T>> {
    return this.client.getEntry(entryID, query);
  }

  getEntries(query: EntryQueries<Modifiers>): Promise<EntryCollection<T>> {
    return this.client.getEntries(query);
  }
}
