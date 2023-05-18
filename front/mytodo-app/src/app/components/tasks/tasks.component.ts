import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from 'src/app/service/tasks/task.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { MatExpansionPanel } from '@angular/material/expansion'
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  loading: boolean;
  tasks: Task[] = [];
  filteredTasks: Task[] = []
  taskSearch: string = "";
  createCollapse: boolean = false;

  pageSize:number = 15;
  currentPage: number = 0;
  totalItems: number = 0;

  filter: any = {
    veryLow: false,
    low: false,
    neutral: false,
    high: false,
    critical: false
  }

  @ViewChild('createTask', { static: true }) createTask: CreateTaskComponent | undefined;
  @ViewChild(MatExpansionPanel, {static: true}) matExpansionPanelElement: MatExpansionPanel | undefined;


  constructor(private service: TaskService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.tasks = []
    this.filteredTasks = []
    this.loading = true;
    this.getTasks()
  }

  getTasks() {
    this.service.getAllTasks(this.pageSize, this.currentPage).subscribe(task => {
      this.tasks = task.tasks || [];
      this.totalItems = task.total || 0;
      this.currentPage = task.page || 0;
      this.pageSize = task.page_size || 15;

      this.filteredTasks = this.tasks;
      this.loading = false;
    })
  }

  public handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getTasks();
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(x => {
      let matchPriority = false;

      if (!this.filter.veryLow && !this.filter.low && !this.filter.neutral && !this.filter.high && !this.filter.critical) {
        matchPriority = true;
      }
      if (this.filter.veryLow && x.priority == 1) {
        matchPriority = true;
      }
      if (this.filter.low && x.priority == 2) {
        matchPriority = true;
      }
      if (this.filter.neutral && x.priority == 3) {
        matchPriority = true;
      }
      if (this.filter.high && x.priority == 4) {
        matchPriority = true;
      }
      if (this.filter.critical && x.priority == 5) {
        matchPriority = true;
      }

      return x.description.toLowerCase().includes(this.taskSearch.toLowerCase()) && matchPriority;
    });
  }

  getPriorityNameByNumber(number: any) {
    switch (number) {
      case "1":
        return { name: 'Very Low', color: '#6554C0' }
      case "2":
        return { name: 'Low', color: '#00B8D9' }
      case "3":
        return { name: 'Neutral', color: '#36B37E' }
      case "4":
        return { name: 'High', color: '#FFAB00' }
      case "5":
        return { name: 'Critical', color: '#FF5630' }
    }

    return {name: null, color: '#FFFFFF'};
  }

  toggleDone(id: number) {
    let objIndex = this.tasks.findIndex((obj => obj.id == id));
    let toEditTask = this.tasks[objIndex];
    toEditTask.completed = !toEditTask.completed;
    this.service.updateTask(toEditTask).subscribe(() => {
      this.getTasks();
      this.fireSuccessAlert(toEditTask.completed ? 'Task marked as done!' : 'Task marked as undone!')
    }, err => {
      this.fireErrorAlert('An error ocurred!', err || null)
    })
  }

  deleteTask(id: number) {
    try {
      this.service.deleteTask(id).subscribe(() => {
        this.getTasks();
        this.fireSuccessAlert('Task sucessfully deleted!')
      }, err => {
        this.fireErrorAlert('An error ocurred!', err || null)
      })
    } catch (err) {
     
    }
  }

  editTask(id: number) {
    if (this.createTask) {
      let cloned = this.tasks.slice(0);
      let objIndex = cloned.findIndex((obj => obj.id == id));
      let editTask = new Task()
      editTask = cloned[objIndex];
      editTask.dueDate = new Date(editTask.dueDate);
      this.createTask?.createForm(editTask);

      console.log('is expanded', this.matExpansionPanelElement?.expanded)

      if(!this.matExpansionPanelElement?.expanded) {
        console.log('is expanded')
        this.matExpansionPanelElement?.toggle();
      }
    }
  }

  fireSuccessAlert(text:string) {
    Swal.fire({
      position: 'bottom-right',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500
    })
  }

  fireErrorAlert(title:string, text:any) {
    Swal.fire({
      position: 'bottom-right',
      icon: 'error',
      title: title,
      text: text || '',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
