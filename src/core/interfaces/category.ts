import { OperationType } from "../enums"

export interface Category {
    id:number
    name: string
    type: OperationType
    createdAt: Date
    updatedAt: Date
}
export interface CreateCategoryDto {
    name: string
    type: OperationType
}