import { Blog, BlogId, BlogUUID, BlogData, blogEntity } from "../../src/modules/blog/models/Blog";
import { User } from "../../src/modules/user/models/User";
import { Trace } from "../../src/modules/common/models";
import { DBIO } from "../../src/libs/IO";


export class BlogFactory {

	createBlog(blog: Blog): DBIO<Blog> {
		let e = blogEntity

		return e.insert(e.id.set(blog.id),
			e.uuid.set(blog.guid),
			...e.data.columns(blog.data),
			...e.trace.columns(blog.trace),
		).map(id => {
			return blog
		})
	}

	static blogs(user: User): Blog[] {
		return [
			new Blog(new BlogId(111), new BlogUUID("test-blog-4162-9556-3dec13baee44"), new BlogData("Blog title 1", "Blog description 1"), Trace.createTrace(user.id)),
			new Blog(new BlogId(111), new BlogUUID("test-blog-4162-9556-3dec13baee44"), new BlogData("Blog title 1", "Blog description 1"), Trace.createTrace(user.id)),
			new Blog(new BlogId(111), new BlogUUID("test-blog-4162-9556-3dec13baee44"), new BlogData("Blog title 1", "Blog description 1"), Trace.createTrace(user.id))
		]
	}

}