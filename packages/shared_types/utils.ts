import { TAPIError } from "./types";

export const createError = (
  statusCode: number,
  message: unknown
): TAPIError => {
  return {
    statusCode,
    message: message as string | object, //unsure how better to handle this, often the error type returned from the fromPromise function is unknown
  };
};
