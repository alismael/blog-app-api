import { FileService } from './../services/FileService'

// File repository
let _fileService: FileService = new FileService();

export class File {
    
    
    // Public attributes
    public id: number;
    public title: string;
    public object_model: string;
    public object_id: number;
    public created_by: number;
    public created_at: string;
    public updated_by: number;
    public updated_at: string;

    // Get all Files
    public getFile(id: number) {
        return _fileService.getFile(id);
    }

    // Get all Files
    public getFiles(objectId: number, objectModel: string) {
        return _fileService.getFiles( objectId, objectModel)
    }

    // Add new File
    public add() {
        return _fileService.add(this);
    }

    // Delete File    
    public async delete() {
        return _fileService.delete(this);
    }
}