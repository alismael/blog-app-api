import { combineReducers } from "redux"

import * as blogs from "./dashboard/reducers/blogReducers"
import * as user from "./auth/reducers/userReducer"

export default combineReducers({
  blogs: blogs.reducer,
  user: user.reducer
})