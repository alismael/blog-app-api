import { IBlogRepository } from './../repositories/IBlogRepository'
import { BlogMysqlRepository } from './../repositories/BlogMysqlRepository'
import { Blog } from './../models/Blog'


export class BlogService {

    private blogRepository: IBlogRepository = new BlogMysqlRepository();
    
    // get all blogs
    public getBlog (guid: string) {
        return this.blogRepository.getBlog(guid);
    }

    // Add new blog
    public add (blog: Blog) {
        return this.blogRepository.add(blog);
    }

    // Delete blog
    public delete (guid: string) {
        return this.blogRepository.delete(guid);
    }
}
