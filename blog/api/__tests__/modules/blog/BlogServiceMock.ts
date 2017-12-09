import { BlogService } from "../../../src/modules/blog/services/BlogService";
import { IO } from "../../../src/libs/IO";
import { Maybe } from "tsmonad";
import { Blog, BlogData } from "../../../src/modules/blog/models/Blog";
import blogFactory from "../../factories/BlogFactory";
import { Id } from "../../../src/modules/common/models";
import { User } from "../../../src/modules/user/models/User";

export default new class extends BlogService {
  // Get blog by guid
  findByGuid(guid: string): IO<Maybe<Blog>> {
    return IO.successful(Maybe.just(blogFactory.blog))
  }

  // Get blog by guid
  findById(id: Id): IO<Maybe<Blog>> {
    return IO.successful(Maybe.just(blogFactory.blog))
  }

  // Add new blog
  insert(data: BlogData, user: User): IO<number> {
    return IO.successful(1)
  }

  // Update blog
  update(guid: string, data: BlogData, user: User): IO<number> {
    return IO.successful(1)
  }

  // Get user blogs
  getUserBlogs(user: User): IO<Blog[]> {
    return IO.successful([blogFactory.blog])
  }
}()