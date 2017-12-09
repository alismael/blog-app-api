import { RowDataPacket } from 'mysql2';
import { Primative } from '../../entity/models/Entity'
import { UserId } from '../../user/models/User'
import { IO, DBIO } from "../../../libs/IO"
import { EntityMysqlRepository } from '../../entity/repositories/EntityMysqlRepository'
// import { blogEntity } from '../models/Blog';

export class BlogMysqlRepository<R extends RowDataPacket, S extends Primative> extends EntityMysqlRepository<R, S> {
  constructor(tableName: string) {
    super(tableName)
  }
  // get entity
  public getUserBlogs(userId: UserId): IO<RowDataPacket[]> {
    let query = super.find()
      .where(`created_by = ?`, [userId.value])
      .toParam()

    return new DBIO(query.text, query.values)
      .map(records => (<RowDataPacket[]>records))
  }
}