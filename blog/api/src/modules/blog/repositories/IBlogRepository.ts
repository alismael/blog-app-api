import { Maybe } from 'tsmonad';
import { ColumnValue, Primative } from '../../entity/models/Entity'
import { Blog } from './../models/Blog'
import { DBIO } from "../../../libs/IO"
import { UserId } from '../../user/models/User'

export interface IBlogRepository<Blog, S extends Primative> {
  getUserBlogs(userId: UserId): DBIO<Blog[]>
}