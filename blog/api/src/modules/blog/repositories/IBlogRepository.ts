import { IO } from "../../../libs/IO"
import { UserId } from '../../user/models/User'
import { RowDataPacket } from "mysql2";

export interface IBlogRepository {
  getUserBlogs(userId: UserId): IO<RowDataPacket[]>
}