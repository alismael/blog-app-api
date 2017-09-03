import { File } from './../models/File'


export class FileService {
    private file = new File();


    // abstraction for finding file
    public find(guid?: string) {
        if (guid)
            return this.findByGuid(guid);
        else
            return this.findAll();
    }

    // Get all files
    public async findAll() {
        return await this.file
            .find();
    }

    // Get file by guid
    public async findByGuid(guid: string) {
        return await this.file
            .find()
            .where('guid', guid);
    }

    // Get file by guid
    public async findByObject(objectId: number, objectModel: string) {
        return await this.file
            .find()
            .where('object_id', objectId)
            .where('object_model', objectModel);
    }

    // Add new file
    public async insert(file: File) {
        return await this.file
            .insert(file);
    }

    // Update file
    public async update(guid: string, updates: any) {
        return await this.file
            .update(updates)
            .where('guid', guid);
    }

    // Delete file
    public async delete(guid: string) {
        return await this.file
            .delete()
            .where('guid', guid);
    }

    // Attach file
    public attach(object_id: number, object_model: string, fileGuid: string[]) {
        return this.file.attach(object_id, object_model, fileGuid);
    }
}
