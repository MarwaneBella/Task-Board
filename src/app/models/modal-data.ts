import { Task } from "./task"

export class ModalData{
    isopen : boolean
    type ?: 'create' | 'update' |'delete' 
    columnId?: number
    task ?: Task
}