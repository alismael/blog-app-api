import * as express from 'express'
import { File } from '../models/File'
import { ObjectId } from 'mongodb'

export let fileRouter = express.Router();

// Default get route
fileRouter.get('/all', (req, res, next) => {

    let file = new File();

    let objectId = req.body.objectId;
    let objectModel = req.body.objectModel;
    

    // Get all files
    file.getFiles(objectId, objectModel, function (response) {
        
        // Return files to response
        res.json( response );

    });
});

// Default get route
fileRouter.get('/:id', (req, res, next) => {

    let file = new File();

    let _id = req.params.id;

    // Get all files
    file.getFile(_id, function (response) {
        
        // Return files to response
        res.json( response );

    });
});

// Default post route
fileRouter.post('/', (req, res, next) => {
    
    let file = new File();
    
    file.title = req.body.title;
    file.objectId = req.body.object_id;
    file.objectModel = req.body.object_model;
    file.created_by = ObjectId("599b5382152cbb292f440615");
    file.created_at = Date().toLocaleString();


    // Add new file
    file.add( function (response) {
        
        // Return categories to response
        res.json( response );

    });
});

// Default delete route
fileRouter.delete('/', (req, res, next) => {
    
    let file = new File();
    file._id = ObjectId(req.body.id);
    
    // delete file
    file.delete( function (response) {
        
        // Return categories to response
        res.json( response );

    });
});