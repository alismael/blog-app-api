import * as express from 'express'
import { File } from '../models/File'
import { FileService } from '../services/FileService'
var multer = require('multer')
var uuid = require('uuid')
var fs = require('fs')

export let fileRouter = express.Router();

let fileService = new FileService();

// Get files by object_model, object_id
fileRouter.get('/all/:model/:id', async (req, res, next) => {
    let files = await fileService.find( { 'object_id': req.params.id, 'object_model': req.params.model } );
    res.json( files );
});

// Get file with guid
fileRouter.get('/:guid', async (req, res, next) => {
    let file = await fileService.find( { 'guid': req.params.guid } );
    res.json( file );
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
        let response = await fileService.insert(fileObj);
        res.json( response );
    });
});

// Default delete route
fileRouter.delete('/:guid', async (req, res, next) => {
    let response = await fileService.delete( {'guid': req.params.guid} );
    res.json( response );
});

// Attach files with object_id, object_model
fileRouter.put('/attach', async (req, res, next) => {
    let response = await fileService.attach(req.body.object_id, req.body.object_model, req.body.files);
    res.json( response );
});