import { Blog, blogEntity, BlogUUID, BlogId, BlogData } from "../models/Blog"
import { IO } from "../../../libs/IO"
import { Maybe } from 'tsmonad'
import { Trace, Id } from './../../common/models'
import { User } from "../../user/models/User"
import * as uuid from "uuid"

export class BlogService {

  // Get blog by guid
  findByGuid(guid: string): IO<Maybe<Blog>> {
    return blogEntity.findOne(blogEntity.uuid.set(new BlogUUID(guid)))
  }

  // Get blog by guid
  findById(id: Id): IO<Maybe<Blog>> {
    return blogEntity.findOne(blogEntity.id.set(new BlogId(id)))
  }

  // Add new blog
  insert(data: BlogData, user: User): IO<number> {
    return blogEntity.insert(
      blogEntity.uuid.set(new BlogUUID(uuid.v4())),
      ...blogEntity.data.columns(new BlogData(data.title, data.description)),
      ...blogEntity.trace.columns(Trace.createTrace(user.id))
    )
  }

  // Update blog
  update(guid: string, data: BlogData, user: User): IO<number> {
    return blogEntity.update(
      blogEntity.uuid.set(new BlogUUID(guid)),
      ...blogEntity.data.columns(new BlogData(data.title, data.description)),
      ...blogEntity.trace.updated.columns(Trace.createTrace(user.id).updated)
    )
  }

  // Get user blogs
  getUserBlogs(user: User): IO<Blog[]> {
    return blogEntity.getUserBlogs(user.id)
  }
}
