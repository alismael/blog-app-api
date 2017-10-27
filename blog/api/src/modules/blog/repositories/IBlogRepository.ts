import { DBIO } from "../../../libs/IO"
import { UserId } from '../../user/models/User'
import { Blog } from "../models/Blog";

export interface IBlogRepository {
  getUserBlogs(userId: UserId): DBIO<Blog[]>
}