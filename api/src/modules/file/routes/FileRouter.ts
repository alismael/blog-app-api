import * as express from 'express'
import { File } from '../models/File'
var multer = require('multer')
var uuid = require('uuid')
var fs = require('fs')

export let fileRouter = express.Router();

// Default get route
fileRouter.get('/all/:model/:id', async (req, res, next) => {

    let file = new File();

    let objectId = req.params.id;    
    let objectModel = req.params.model;    
    

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

fileRouter.post('/upload', async function(req, res){

    let fileObj = new File();
    
    fileObj.guid = uuid.v1();
    fileObj.object_id = 1;
    fileObj.object_model = 'blog';
    fileObj.created_by = 1;
    fileObj.updated_by = 1;

    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            let dest = './uploads/' + fileObj.guid;
            let stat = null;
            try {
                stat = fs.statSync(dest);
            }
            catch (err) {
                fs.mkdirSync(dest);
            }
            if (stat && !stat.isDirectory()) {
                res.json("error");
            } 
            callback(null, dest);
        },
        filename: function (req, file, callback) {
            fileObj.title = file.originalname;    
            callback(null, file.originalname);
        }
    });
    var upload = multer({ storage : storage}).single('file');

    upload(req, res, async function(err) {
        if(err) {
            res.json("error");
        }
        
        // Add new file
        let response = await fileObj.add();
    
        // Return categories to response
        res.json( response );
    });
});
    

// Default post route
fileRouter.post('/', async (req, res, next) => {
    
    let file = new File();
    
    file.title = req.body.title;
    file.object_id = req.body.object_id;
    file.object_model = req.body.object_model;
    file.created_by = req.body.user_id;
    file.updated_by = req.body.user_id;

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