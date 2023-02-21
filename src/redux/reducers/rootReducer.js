import { combineReducers } from "redux";
import parcelReducer from "../reducers/parcelReducer";
import authReducer from "../reducers/authReducer";

export const reducers = combineReducers({
    authReducer,
  parcelReducer,
});
