import * as stream from "stream";
import { UUID } from "../../common/models";

export interface IFileService {
  upload(stream: NodeJS.ReadableStream, uuid: UUID): stream.Writable
}