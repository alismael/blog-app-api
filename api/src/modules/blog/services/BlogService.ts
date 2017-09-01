import { Blog } from './../models/Blog'


export class BlogService {
    private blog = new Blog();
    
    // Get blogs
    public find (condition?: any) {
        return this.blog.find(condition);
    }

    // Add new blog
    public insert (blog: Blog) {
        return this.blog.insert(blog);
    }

    // Delete blog
    public delete (condition: any) {
        return this.blog.delete(condition);
    }
}
