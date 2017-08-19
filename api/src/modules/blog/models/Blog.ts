import { IBlogRepository } from './../repositories/IBlogRepository'
import { BlogMongoRepository } from './../repositories/BlogMongoRepository'
import { ObjectId } from 'mongodb'

// Blog repository
let _repository: IBlogRepository = new BlogMongoRepository();

export class Blog {
    
    
    // Public attributes
    public _id: ObjectId;
    public title: string;
    public description: string;
    public user_id: string;

    // Get all Blogs
    public getAllBlogs( callback ) {
        _repository.getAllBlogs(function (res) {
            callback(res);
        });
    }

    // Add new Blog
    public add(callback) {
        _repository.add(this, function (res) {
            callback(res);
        });
    }

    // Delete Blog    
    public delete(callback) {
        _repository.delete(this, function (res) {
            callback(res);
        });
    }
}