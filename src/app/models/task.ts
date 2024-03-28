export class Task{
    id:number
    name:string
    description:string
    priority: 'Low' | 'Medium' | 'High'
    date : Date = new Date()
}
