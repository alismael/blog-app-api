import { IBlogRepository } from './IBlogRepository'
import { Blog } from './../models/Blog'
import knex  from './../../knex/knex'


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
