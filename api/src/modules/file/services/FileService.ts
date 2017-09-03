import { File } from './../models/File'


export class FileService {
    private file = new File();
    
    // Get files
    public find (condition?: any) {
        return this.file.find(condition);
    }

    // Add new file
    public insert (file: File) {
        return this.file.insert(file);
    }

    // Delete file
    public delete (condition: any) {
        return this.file.delete(condition);
    }

    // Update file
    public update (updates: any, condition: any) {
        return this.file.update(updates, condition);
    }

    // Attach file
    public attach (object_id: number, object_model: string, fileGuid: string[]) {
        return this.file.attach(object_id, object_model, fileGuid);
    }
}
