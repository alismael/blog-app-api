import { WriteStream } from 'fs';
import { UserId } from "../../user/models/User"
import { FileUUID } from "../models/File";
import { IO } from "../../../libs/IO";

export interface IFileService {
  upload(stream: NodeJS.ReadableStream, fileName: string, userId: UserId): WriteStream
  insert(uuid: FileUUID, userId: UserId): IO<number>
}