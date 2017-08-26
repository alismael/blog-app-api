import { IBlogRepository } from './IBlogRepository'
import { Blog } from './../models/Blog'
import knex  from './../../knex/knex'
var uuid = require('uuid')


export class BlogMysqlRepository implements IBlogRepository {
    
    // get all blogs
    public async getAllBlogs () {
        return await knex
                    .select('*')
                    .from('blog')
                    .catch( function (err) {
                        return "error"
                    });
    }

    // Add new blog
    public async add (blog: Blog) {
        blog.guid = uuid.v1();
        return await knex('blog')
                    .insert( blog )
                    .catch( function (err) {
                        return "error"
                    });
    }

    // Delete blog
    public async delete (blog: Blog) {
        return await knex('blog')
                    .where('id', blog.id)
                    .del()
                    .catch( function (err) {
                        return "error"
                    });
    }
}
