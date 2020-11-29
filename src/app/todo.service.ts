import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  configUrl = 'http://localhost:8080/todo';
  todo: Todo = new Todo;
  constructor(private http: HttpClient) { }

  getTodoItems(){
    return this.http.get<Todo[]>(this.configUrl);
  }

  postTodoItem(todo: Todo){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.post<Todo>(this.configUrl, JSON.stringify(todo), options);
  }

  putTodoItem(todo: Todo){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.put<Todo>(this.configUrl+'/'+todo.id, JSON.stringify(todo), options);
  }

  deleteTodoItem(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.delete<Todo>(this.configUrl+'/'+id);
  }
}
