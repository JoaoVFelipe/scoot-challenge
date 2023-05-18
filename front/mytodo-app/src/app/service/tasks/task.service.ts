import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/Task';

import { environment } from './../../../environment/environment';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiurl = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  public createTask(task: Task): Observable<any> {
    return this.http.post(this.apiurl + '/tasks', task).pipe(catchError(error => {
      return throwError(error.message || error)
    }));
  }

  public getAllTasks(pageSize: number, currentPage: number): Observable<any> {
    return this.http.get(`${this.apiurl}/tasks?${pageSize ? `page_size=${pageSize}` : ''}${currentPage ? `&page_number=${currentPage}` : ''}`).pipe(catchError(error => {
      return throwError(error.message || error)
    }));
  }

  public updateTask(task: Task): Observable<any> {
    return this.http.put(this.apiurl + '/tasks?id=' + task.id, task).pipe(catchError(error => {
      return throwError(error.message || error)
    }));
  }

  public deleteTask(id: Number): Observable<any> {
    return this.http.delete(this.apiurl + '/tasks?id=' + id).pipe(catchError(error => {
      return throwError(error.message || error)
    }));
  }
}
