import { registerAs } from "@nestjs/config";
import { AlgoliaSearchOptions } from "algoliasearch/lite";

export default registerAs("algolia", () => {
  return {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
  };
});
