import { Blog } from './../models/Blog'

export interface IBlogRepository {
    getAllBlogs ();
    add (blog: Blog);
    delete (guid: string);
}
