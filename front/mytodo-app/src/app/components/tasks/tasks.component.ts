import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from 'src/app/service/tasks/task.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  loading:boolean;
  tasks:Task[] = [];
  filteredTasks:Task[] = []
  taskSearch:string = "";

  @ViewChild('createTask', { static: true }) createTask: CreateTaskComponent | undefined;

  constructor(private service:TaskService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.tasks=[]
    this.filteredTasks=[]
    this.loading = true;
    this.getTasks()
  }

  getTasks() {
    this.service.getAllTasks().subscribe(task=>{
      this.tasks = task.tasks;
      this.filteredTasks = this.tasks;
      this.loading = false;
    })
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(x => x.description.toLowerCase().includes(this.taskSearch.toLowerCase()));
  }

  toggleDone (id:number) {
    let objIndex = this.tasks.findIndex((obj => obj.id == id));
    let toEditTask = this.tasks[objIndex];
    toEditTask.completed = !toEditTask.completed;
    this.service.updateTask(toEditTask).subscribe(() =>{
      this.getTasks()
    })
  }

  deleteTask (id:number) {
    try {
      this.service.deleteTask(id).subscribe(()=>{
       this.getTasks();
      })
    } catch (err) {
      console.log("error")
    }
  }

  editTask (id:number) {
    if(this.createTask) {
      let objIndex = this.tasks.findIndex((obj => obj.id == id));
      let editTask = this.tasks[objIndex];
      editTask.dueDate = new Date(editTask.dueDate);
      this.createTask?.createForm(editTask);
    }
  }
}
