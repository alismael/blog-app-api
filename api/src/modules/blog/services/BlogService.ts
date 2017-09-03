import { Blog } from './../models/Blog'


export class BlogService {
    private blog = new Blog();

    // Get blog by guid
    public async findAll() {
        return await this.blog
            .find();
    }
   
    // Get blog by guid
    public async findByGuid(guid: string) {
        return await this.blog
            .find()
            .where('guid', guid);
    }

    // Add new blog
    public async insert(blog: Blog) {
        return await this.blog
            .insert(blog);
    }

    // Update blog
    public async update(guid: string, updates: any) {
        return await this.blog
            .update(updates)
            .where('guid', guid);
    }

    // Delete blog
    public async delete(guid: string) {
        return await this.blog
            .delete()
            .where('guid', guid);
    }
}
