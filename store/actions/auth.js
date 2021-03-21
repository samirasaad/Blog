import * as TYPES from "./../types/auth";

export const isAuthReceive = (payload) => ({
  type: TYPES.IS_AUTH_RECIEVE,
  payload,
});
