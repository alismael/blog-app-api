import * as stream from "stream"
import { UserId } from "../../user/models/User"
import { FileUUID } from "../models/File";
import { IO } from "../../../libs/IO";

export interface IFileService {
  upload(stream: NodeJS.ReadableStream, fileName: string, userId: UserId): stream.Writable
  insert(uuid: FileUUID, userId: UserId): IO<number>
}