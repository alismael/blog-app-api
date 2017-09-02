import { UserId } from "../modules/user/models/User";

export interface Trace {
    createdBy: UserId
    createdAt: Date
    updatedBy: UserId
    updatedAt: Date
}

export const createTrace = (id: UserId): Trace => {
    return {
        createdBy: id,
        createdAt: new Date(),
        updatedBy: id,
        updatedAt: new Date()
    }
}