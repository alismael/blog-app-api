import { Entity } from './../../entity/models/Entity'


export class Blog extends Entity {


    // Public attributes
    public id: number;
    public title: string;
    public description: string;
    public guid: string;
    public created_by: number;
    public created_at: Date;
    public updated_by: number;
    public updated_at: Date;


    public tableName() {
        return "blog";
    }

    public tableColumns() {
        return ['id', 'title', 'description', 'guid', 'created_by', 'created_at', 'updated_by', 'updated_at'];
    }
}