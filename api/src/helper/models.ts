export interface Trace {
    createdBy: number
    createdAt: Date
    updatedBy: number
    updatedAt: Date
}

export const createTrace = (id: number): Trace => {
    return {
        createdBy: id,
        createdAt: new Date(),
        updatedBy: id,
        updatedAt: new Date()
    }
}