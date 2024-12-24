import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import postReducer from "./post.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

export default rootReducer;
