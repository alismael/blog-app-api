import { Entity } from "./../../entity/models/Entity"
import { IFileRepository } from "./../repositories/IFileRepository"
import { FileMysqlRepository } from "./../repositories/FileMysqlRepository"

// File repository
const fileRepository: IFileRepository = new FileMysqlRepository();

export class File extends Entity {

  // Public attributes
  public id: number;
  public title: string;
  public objectId: number;
  public objectModel: string;
  public guid: string;
  public createdBy: number;
  public createdAt: string;
  public updatedBy: number;
  public updatedAt: string;

  public tableName() {
    return "file";
  }

  public tableColumns() {
    return ["id", "title", "object_id", "object_model", "guid", "created_by", "created_at", "updated_by", "updated_at"];
  }

  // Attach file with object
  public attach(objectId: number, objectModel: string, files: string[]) {
    return fileRepository.attach(objectId, objectModel, files);
  }
}
