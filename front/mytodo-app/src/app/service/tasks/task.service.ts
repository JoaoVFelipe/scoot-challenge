import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/Task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiurl = "http://127.0.0.1:3001";

  constructor(private http: HttpClient) { }

  public createTask(task: Task): Observable<any> {
    return this.http.post(this.apiurl + '/tasks', task);
  }

  public getAllTasks(): Observable<any> {
    return this.http.get(this.apiurl + '/tasks');
  }

  public updateTask(task: Task): Observable<any> {
    return this.http.put(this.apiurl + '/tasks?id=' + task.id, task);
  }

  public deleteTask(id: Number): Observable<any> {
    return this.http.delete(this.apiurl + '/tasks?id=' + id);
  }
}
