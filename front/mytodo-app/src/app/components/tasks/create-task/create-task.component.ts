import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/Task';
import { TaskService } from '../../../service/tasks/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  constructor(private service: TaskService, public formBuilder: FormBuilder) {
    this.createForm(new Task())
  }

  taskForm: FormGroup = this.formBuilder.group({});
  newTask: Task = new Task()
  toEditTask: Task = new Task();
  @Output() onCreate = new EventEmitter();

  ngOnInit(): void { }

  createForm(task: Task) {
    this.taskForm = this.formBuilder.group(task);
  }

  clearTask() {
    this.taskForm.reset();
  }

  saveTask() {
    try {
      if (!this.taskForm.value.id) {
        this.newTask = this.taskForm.value
        this.newTask.completed = false;
        this.service.createTask(this.newTask).subscribe(() => {
          this.onCreate.emit()
          this.fireSuccessAlert("Task created successfully!")
        }, (err) => {
          console.log(err)
          this.fireErrorAlert("An error occurred!", err)
        });

      } else {
        this.toEditTask = this.taskForm.value
        this.service.updateTask(this.toEditTask).subscribe(() => {
          this.onCreate.emit()
          this.fireSuccessAlert("Task updated successfully!")
        }, (err) => {
          console.log(err)
          this.fireErrorAlert("An error occurred!", err)
        });
      }
      this.taskForm.reset();
    } catch (err) {
      this.fireErrorAlert("An error occurred!", null)
    }
  }

  fireSuccessAlert(text: string) {
    Swal.fire({
      position: 'bottom-right',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500
    })
  }

  fireErrorAlert(title: string, text: any) {
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
