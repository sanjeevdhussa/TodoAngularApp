import { ViewChild } from '@angular/core';
import { Component, Input } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Todo } from './todo';
import { TodoService } from './todo.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-todo-app';
  todoList: Todo[] = [];
  constructor(private service: TodoService){
    service.getTodoItems().subscribe(data => this.todoList =  data);
  }


  todoItem: Todo = new Todo();
  postTodoItem(){
    if(this.todoItem.id > 0){ //PUT
      this.service.putTodoItem(this.todoItem).subscribe(data =>{
        this.todoItem=new Todo();
        this.buttonName = 'Add';
        this.table.renderRows();
      });
    } else { //POST
      this.service.postTodoItem(this.todoItem).subscribe(data =>{
        this.todoList.unshift(data); 
        this.todoItem=new Todo();
        this.table.renderRows();
      });
    }
  }

  deleteTodoItem(id:number){
    this.service.deleteTodoItem(id).subscribe(() => {
      this.todoList = this.todoList.filter(v => v.id !=id);
    });
  }

  onEdit(todoItem: Todo){
    this.todoItem = todoItem;
    this.buttonName = 'Update';
  }

  markDone(todoItem: Todo){
    if(todoItem.status == 'OPEN')
      todoItem.status='DONE';
    else
      todoItem.status='OPEN';
    this.service.putTodoItem(todoItem).subscribe(data =>{
      this.todoList = this.todoList.filter(v => v.id !=this.todoItem.id);
      this.service.getTodoItems().subscribe(data => this.todoList =  data);
      this.table.renderRows();
    });
  }
  displayedColumns: string[] = ['customColumnForChkbox', 'summary', 'description','customColumnForEdit'];
  buttonName :string = 'Add'; 
  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;
}
