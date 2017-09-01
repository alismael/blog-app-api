import * as express from 'express'
import { Blog } from '../models/Blog'
var uuid = require('uuid')

export let blogRouter = express.Router();

// Get all blogs
blogRouter.get('/', async (req, res, next) => {
    
    let blog = new Blog();

    // Get all blogs
    let blogs = await blog.find();

    // Return to response
    res.json( blogs );
});

// Get blog
blogRouter.get('/:guid', async (req, res, next) => {
    
    let blog = new Blog();

    // Get all blogs
    let blogs = await blog.find( { 'guid': req.params.guid} );

    // Return to response
    res.json( blogs );
});

// Insert new blog
blogRouter.post('/', async (req, res, next) => {
    
    let blog = new Blog();
    
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.guid = uuid.v1();
    blog.created_by = req.body.user_id;
    blog.updated_by = req.body.user_id;

    // Add new blog
    let response = await blog.insert(blog);

    // Return to response
    res.json( response );
});

// Delete blog
blogRouter.delete('/:guid', async (req, res, next) => {
    let blog = new Blog();
    
    // Add new blog
    let response = await blog.delete( {'guid': req.params.guid} );
    
    // Return to response
    res.json( response );
});