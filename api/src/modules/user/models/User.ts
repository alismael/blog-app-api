import { Entity } from "../../entity/models/Entity";

export class User extends Entity {

    // Public attributes
    // public id: number;
    public guid: string;
    public title: string
    public created_by: number;
    public created_at: Date;
    public updated_by: number;
    public updated_at: Date;


    tableName(): string {
        return "user"
    }
    tableColumns(): string[] {
        return ["guid", "title"]
    }
}

