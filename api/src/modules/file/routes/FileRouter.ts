import * as express from 'express'
import { File } from '../models/File'
var multer = require('multer')
var uuid = require('uuid')
var fs = require('fs')

export let fileRouter = express.Router();

// Get files by object_model, object_id
fileRouter.get('/all/:model/:id', async (req, res, next) => {

    let file = new File();

    let objectId = req.params.id;    
    let objectModel = req.params.model;    
    

    // Get all files
    let response = await file.getFiles(objectId, objectModel);

    // Return file to response
    res.json( response );
});

// Get file with guid
fileRouter.get('/:guid', async (req, res, next) => {

    let file = new File();

    let guid = req.params.guid;

    // Get file
    let response = await file.getFile(guid);

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
            let uploadDir = './uploads/';
            let dest = uploadDir + fileObj.guid;
            let stat = null;
            try {
                stat = fs.statSync(dest);
            }
            catch (err) {
                try {
                    fs.statSync(uploadDir);
                }
                catch (err) {
                    fs.mkdirSync(uploadDir);
                }
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
    
        // Return to response
        res.json( response );
    });
});

// Default delete route
fileRouter.delete('/:guid', async (req, res, next) => {
    
    let file = new File();
    file.guid =  req.params.guid;
    
    // delete file
    let response = await file.delete();

    // Return to response
    res.json( response );
});

// Attach files with object_id, object_model
fileRouter.put('/attach', async (req, res, next) => {
    
    let file = new File();
    
    let objectId: number = req.body.object_id;
    let objectModel: string = req.body.object_model;
    let files: string[] = req.body.files;

    // delete file
    let response = await file.attach(objectId, objectModel, files);

    // Return to response
    res.json( response );
});