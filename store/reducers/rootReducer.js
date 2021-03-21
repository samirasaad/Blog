import { combineReducers } from "redux";
import isAuthReducer from './auth';

export default combineReducers({
  isAuthnticatedUser:isAuthReducer
});
