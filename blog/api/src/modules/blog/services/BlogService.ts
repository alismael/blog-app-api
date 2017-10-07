import { Blog, blogEntity, BlogUUID, BlogId, BlogData} from "../models/Blog"
import { DBIO } from "../../../libs/IO"
import { Maybe } from 'tsmonad'
import { Trace } from './../../common/models'
import { UserId } from "../../user/models/User"
import * as uuid from "uuid"

export class BlogService {

  // Get all blogs
  findAll(): DBIO<Blog[]> {
    return blogEntity.find()
  }

  // Get blog by guid
  findByGuid(guid: string): DBIO<Maybe<Blog>> {
    return blogEntity.findOne(blogEntity.uuid.set(new BlogUUID(guid)))
  }

  // Add new blog
  insert(data: BlogData): DBIO<number> {
    const userId = new UserId(1) // use test id=1
    return blogEntity.insert(
      blogEntity.uuid.set(new BlogUUID(uuid.v4())),
      ...blogEntity.data.columns(new BlogData(data.title, data.description)),
      ...blogEntity.trace.columns(Trace.createTrace(userId))
    )
  }

  //   // Update blog
  //   public async update(guid: string, updates: any) {
  //     return await blogEntity
  //       .update(updates)
  //       .where('guid', guid)
  //       .catch(function(err) {
  //         return err
  //       });
  //   }

  //   // Delete blog
  //   public async delete(guid: string) {
  //     return await blogEntity
  //       .delete()
  //       .where('guid', guid)
  //       .catch(function(err) {
  //         return err
  //       });
  //   }
}
