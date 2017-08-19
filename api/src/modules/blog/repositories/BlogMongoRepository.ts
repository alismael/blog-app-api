import { config } from './../../../config/config';
import { IBlogRepository } from './IBlogRepository'
import { MongoClient, ObjectId } from 'mongodb'
import { Blog } from './../models/Blog'

export class BlogMongoRepository implements IBlogRepository {

    // MongoDb url
    private dbUrl: string = config.mongoDb.url;
    
    // get all blogs
    public getAllBlogs (callback) {

        MongoClient.connect(this.dbUrl, function(err, db) {
            if (err)
                callback( { error: true, message: err } );

            db.collection("blogs").find().toArray(function(err, obj) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();

                // return result to callback
                callback( { error: false, message: 'Blogs retrived!', blogs: obj } );
            });
        });
    }

    // Add new blog
    public add (blog: Blog, callback) {
        
        MongoClient.connect(this.dbUrl, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            db.collection("blogs").insertOne(blog, function(err, obj) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();

                // return result to callback
                callback( { error: false, message: 'Blog added!', blog: blog } );
            });
        });
    }

    // Delete blog
    public delete (blog: Blog, callback) {
        
        MongoClient.connect(this.dbUrl, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            db.collection("blogs").deleteOne({_id: ObjectId(blog._id) }, function(err, obj) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();
                
                // Count of affected rows
                if ( obj.result.n > 0 )
                    callback( { error: false, message: 'Blog deleted!' } );
                else
                    callback( { error: true, message: 'No blog found!' } );
            });
        });
    }
}
