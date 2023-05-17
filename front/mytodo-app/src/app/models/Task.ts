export class Task {
    id!: number;
    description:string = 'default';
    priority:number = 0;
    dueDate:Date = new Date();
    completed:boolean = false;
}