import { Inject, Injectable } from "@nestjs/common";
import algoliasearch, { SearchClient, SearchIndex } from "algoliasearch";
import { SaveObjectResponse, DeleteResponse } from "@algolia/client-search";
import algoliaConfig from "./config/algoliaConfig";
import { ConfigType } from "@nestjs/config";
import { ResultAsync, Result } from "neverthrow";
import { TAPIError } from "shared_types/types";
import { createError } from "shared_types/utils";

@Injectable()
export class AlgoliaService {
  private algoliaClient: SearchClient;
  private safeInit;
  constructor(
    @Inject(algoliaConfig.KEY) config: ConfigType<typeof algoliaConfig>
  ) {
    this.algoliaClient = algoliasearch(config.appId, config.apiKey);
    this.safeInit = Result.fromThrowable(
      this.algoliaClient.initIndex,
      (error) => {
        return createError(400, error);
      }
    );
  }

  saveContentToIndex(
    indexName: string,
    content: unknown
  ): ResultAsync<SaveObjectResponse, TAPIError> {
    return this.safeInit(indexName).asyncAndThen((index) => {
      return ResultAsync.fromPromise(index.saveObject(content), (error) => {
        return createError(400, error);
      });
    });
  }

  deleteContentFromIndex(
    indexName: string,
    objectID: string
  ): ResultAsync<DeleteResponse, TAPIError> {
    return this.safeInit(indexName).asyncAndThen((index) => {
      return ResultAsync.fromPromise(index.deleteObject(objectID), (error) => {
        return createError(400, error);
      });
    });
  }
}
