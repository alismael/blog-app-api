import { UserId } from './../../src/modules/user/models/User';
import { Trace } from './../../src/modules/common/models';
import { Blog, BlogId, BlogUUID, BlogData, blogEntity } from "../../src/modules/blog/models/Blog";
import { User } from "../../src/modules/user/models/User";
import { DBIO, IO } from "../../src/libs/IO";
import * as uuid from "uuid"

class BlogFactory {

	blogData = new BlogData("Blog title 1", "Blog description 1") 
	blog = new Blog(new BlogId(1), new BlogUUID(uuid.v4()), this.blogData, Trace.createTrace(new UserId(1)))

	createBlog(trace: Trace): IO<Blog> {
		const e = blogEntity
		const blogUUID = new BlogUUID(uuid.v4())
		
		return e.insert(e.uuid.set(blogUUID),
			...e.data.columns(this.blogData),
			...e.trace.columns(trace),
		).map(id => new Blog(new BlogId(id), blogUUID, this.blogData, trace))
	}
}

export default new BlogFactory