import { Trace, Signture, CompositeTrace, UUID, ITraceRecord, IHasValue, uuidColumn } from "./../../common/models";
import { Entity, Primative } from "../../entity/models/Entity";
import { RowDataPacket } from "mysql2"
import { UserId } from "../../user/models/User";

export class FileUUID implements IHasValue<string> {
  constructor(public value: string) { }
}

export class File {
  constructor(
    public uuid: FileUUID,
    public trace: Trace) { }
}

export interface IFileRecord extends ITraceRecord, RowDataPacket  {
  uuid: string
}

class FileEntity extends Entity<File, IFileRecord, Primative> {

  public uuid = uuidColumn<UUID, FileUUID>("uuid")
  public trace = CompositeTrace

  public map(object: IFileRecord): File {
    const uuid = new FileUUID(object.uuid),
      trace = new Trace(new Signture(new UserId(object.created_by), new Date(object.created_at)), new Signture(new UserId(object.updated_by), new Date(object.updated_at)))

    return new File(uuid, trace);
  }
  
  public tableName(): string {
    return "file"
  }

}

export const fileEntity = new FileEntity

