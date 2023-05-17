export class Task {
    id!: number;
    description:string = '';
    priority:number = 0;
    dueDate:Date = new Date();
    completed:boolean = false;
}