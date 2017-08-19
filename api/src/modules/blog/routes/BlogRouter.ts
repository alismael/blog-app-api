import * as express from 'express'
import { Blog } from '../models/Blog'
import { ObjectId } from 'mongodb'

export let blogRouter = express.Router();

// Default get route
blogRouter.get('/', (req, res, next) => {
    
    let blog = new Blog();

    // Get all categories
    blog.getAllBlogs( function (response) {
        
        // Return categories to response
        res.json( response );

    });
});


// Default post route
blogRouter.post('/', (req, res, next) => {
    
    let blog = new Blog();
    
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.user_id = req.body.user_id;


    // Add new blog
    blog.add( function (response) {
        
        // Return categories to response
        res.json( response );

    });
});

// Default delete route
blogRouter.delete('/', (req, res, next) => {
    
    let blog = new Blog();
    blog._id = ObjectId(req.body.id);
    
    // delete blog
    blog.delete( function (response) {
        
        // Return categories to response
        res.json( response );

    });
});