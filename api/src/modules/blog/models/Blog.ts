import { BlogService } from './../services/BlogService'

// Blog repository
let _blogService: BlogService = new BlogService();

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
        return _blogService.getAllBlogs();
    }

    // Add new Blog
    public add() {
        return _blogService.add(this);
    }

    // Delete Blog    
    public delete() {
        return _blogService.delete(this);
    }
}