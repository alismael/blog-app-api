import { IBlogRepository } from './../repositories/IBlogRepository'
import { BlogMysqlRepository } from './../repositories/BlogMysqlRepository'

// Blog repository
let _repository: IBlogRepository = new BlogMysqlRepository();

export class Blog {


    // Public attributes
    public id: number;
    public title: string;
    public description: string;
    public created_by: number;
    public created_at: Date;
    public updated_by: number;
    public updated_at: Date;

    // Get all Blogs
    public getAllBlogs() {
        return _repository.getAllBlogs();
    }

    // Add new Blog
    public add() {
        return _repository.add(this);
    }

    // Delete Blog    
    public delete() {
        return _repository.delete(this);
    }
}