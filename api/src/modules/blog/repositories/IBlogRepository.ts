import { Blog } from './../models/Blog'

export interface IBlogRepository {
    getAllBlogs (callback);
    add (blog: Blog, callback);
    delete (blog: Blog, callback);
}
