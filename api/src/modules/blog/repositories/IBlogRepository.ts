import { Blog } from './../models/Blog'

export interface IBlogRepository {
    getBlog (guid: string);
    add (blog: Blog);
    delete (guid: string);
}
