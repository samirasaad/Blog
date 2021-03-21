import * as types from "./../types/auth";

export default function isAuthReducer(state = { user: null }, action) {
  switch (action.type) {
    case types.IS_AUTH_RECIEVE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
