export type Result<T, E> =
  | { ok: T; err?: undefined }
  | { ok?: undefined; err: E };

export const returnSuccess = <T, E>(ok: T): Result<T, E> => {
  return { ok };
};

export const returnError = <T, E>(err: E): Result<T, E> => {
  return { err };
};
