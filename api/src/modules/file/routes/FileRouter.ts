import * as express from 'express'
import { File } from '../models/File'
import { ObjectId } from 'mongodb'

export let fileRouter = express.Router();

// Default get route
fileRouter.get('/all', async (req, res, next) => {

    let file = new File();

    let objectId = req.body.objectId;
    let objectModel = req.body.objectModel;
    

    // Get all files
    let response = await file.getFiles(objectId, objectModel);

    // Return files to response
    res.json( response );
});

// Default get route
fileRouter.get('/:id', async (req, res, next) => {

    let file = new File();

    let id = req.params.id;

    // Get file
    let response = await file.getFile(id);

    // Return files to response
    res.json( response );
});

// Default post route
fileRouter.post('/', async (req, res, next) => {
    
    let file = new File();
    
    file.title = req.body.title;
    file.object_id = req.body.object_id;
    file.object_model = req.body.object_model;

    // Add new file
    let response = await file.add();

    // Return categories to response
    res.json( response );
});

// Default delete route
fileRouter.delete('/', async (req, res, next) => {
    
    let file = new File();
    file.id = req.body.id;
    
    // delete file
    let response = await file.delete();

    // Return categories to response
    res.json( response );
});