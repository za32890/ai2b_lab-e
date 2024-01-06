import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly baseUrl = 'http://localhost:31890';

  constructor(private http: HttpClient) { }

  public index(archived = false): Observable<Task[]> {
    const url = `${this.baseUrl}/todos`;
    const params = new HttpParams()
      .set('archived', String(archived))
      .set('_sort', 'id')
      .set('_order', 'desc');

    return this.http.get<Task[]>(url, { params });
  }

  public post(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/todos`;
    return this.http.post<Task>(url, task);
  }

  public put(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/todos/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  public delete(task: Task): Observable<any> {
    const url = `${this.baseUrl}/todos/${task.id}`;
    return this.http.delete(url);
  }
}
