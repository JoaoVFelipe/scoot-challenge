import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/Task';
import { TaskService } from '../../../service/tasks/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit{
  constructor(private service:TaskService, public formBuilder: FormBuilder) {
    this.createForm(new Task())
  }

  taskForm: FormGroup = this.formBuilder.group({});
  newTask:Task = new Task()
  toEditTask: Task = new Task();
  @Output() onCreate = new EventEmitter();

  ngOnInit(): void {}

  createForm(task:Task) {
    this.taskForm = this.formBuilder.group(task)
  }

  saveTask () {
    try {
      if(!this.taskForm.value.id) {
        this.newTask = this.taskForm.value
        this.newTask.completed = false;
        this.service.createTask(this.newTask).subscribe(() =>{
          this.onCreate.emit()
        })
      } else {
        this.toEditTask = this.taskForm.value
        this.service.updateTask(this.toEditTask).subscribe(() =>{
          this.onCreate.emit()
        })
      }

      this.taskForm.reset();
    } catch (err) {
      console.log('error')
    }
  }
}
