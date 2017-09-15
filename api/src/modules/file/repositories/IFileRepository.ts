import { File } from "./../models/File"

export interface IFileRepository {
  attach(objectId: number, objectModel: string, files: string[]);
}
