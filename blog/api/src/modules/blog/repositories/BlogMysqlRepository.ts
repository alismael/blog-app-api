import { Maybe } from 'tsmonad'
import { Entity, Column, ColumnValue, Primative } from '../../entity/models/Entity'
import { Blog } from '../models/Blog'
import { UserId } from '../../user/models/User'
import { DBIO } from "../../../libs/IO"
import { EntityMysqlRepository } from '../../entity/repositories/EntityMysqlRepository'
import * as squel from "squel"


export class BlogMysqlRepository<Blog, S extends Primative> extends EntityMysqlRepository<Blog, Primative> {
	constructor(entity: Entity<Blog, Primative>) {
		super(entity)
	}

	// get entity
	public getUserBlogs(userId: UserId): DBIO<Blog[]> {
		let query = super.find()
			.where(`created_by = ?`, [userId.value])
			.toParam()

		return new DBIO<Blog[]>(query.text, query.values)
			.map(entities => {
				return entities.map((entity) => {
					return this._entity.map(entity)
				})
			})
	}
}