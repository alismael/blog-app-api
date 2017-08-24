import { IBlogRepository } from './../repositories/IBlogRepository'
import { BlogMysqlRepository } from './../repositories/BlogMysqlRepository'
import { Blog } from './../models/Blog'


export class BlogService {
    
    // get all blogs
    public async getAllBlogs () {
        let blogRepository: IBlogRepository = new BlogMysqlRepository();
        
        return blogRepository.getAllBlogs();
    }

    // Add new blog
    public async add (blog: Blog) {
        let blogRepository: IBlogRepository = new BlogMysqlRepository();
        
        return blogRepository.add(blog);
    }

    // Delete blog
    public async delete (blog: Blog) {
        let blogRepository: IBlogRepository = new BlogMysqlRepository();
        
        return blogRepository.delete(blog);
    }
}
