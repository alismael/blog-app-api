import { Blog, blogEntity, BlogUUID, BlogId } from "../models/Blog"

export class BlogService {

  // Get blog by guid
  public async findAll() {
    return await blogEntity
      .find()
      .catch(function(err) {
        return err
      });
  }

//   // Get blog by guid
//   public async findByGuid(guid: string) {
//     return await blogEntity
//       .find()
//       .where('guid', guid)
//       .catch(function(err) {
//         return err
//       });
//   }

//   // Add new blog
//   public async insert(blog: Blog) {
//     return await blogEntity
//       .insert(blog)
//       .catch(function(err) {
//         return err
//       });
//   }

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
