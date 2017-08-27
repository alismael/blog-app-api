import { FileService } from './../services/FileService'

// File repository
let _fileService: FileService = new FileService();

export class File {
    
    
    // Public attributes
    public id: number;
    public title: string;
    public object_model: string;
    public object_id: number;
    public guid: string;    
    public created_by: number;
    public created_at: string;
    public updated_by: number;
    public updated_at: string;

    // Get file by guid
    public getFile(guid: string) {
        return _fileService.getFile(guid);
    }

    // Get files by object_model, object_id
    public getFiles(objectId: number, objectModel: string) {
        return _fileService.getFiles( objectId, objectModel)
    }

    // Add new file
    public add() {
        return _fileService.add(this);
    }

    // Delete file by guid
    public delete() {
        return _fileService.delete(this.guid);
    }
}