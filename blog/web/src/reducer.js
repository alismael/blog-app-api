import { combineReducers } from "redux"

import blogs from "./dashboard/reducers/blogReducers"
import user from "./auth/reducers/authReducers"

export default combineReducers({
  user,
  blogs
})
