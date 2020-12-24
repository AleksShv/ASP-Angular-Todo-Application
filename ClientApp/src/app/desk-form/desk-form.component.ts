import { Component } from '@angular/core';
import { DeskService, Todo } from '../shared/desk.service';

@Component({
  selector: 'app-desk-form',
  templateUrl: './desk-form.component.html',
  styleUrls: ['./desk-form.component.css']
})
export class DeskFormComponent{

  title: string = '';

  constructor(public deskService: DeskService) { }

  public getAllItems(){
    this.deskService.getAllItems().subscribe(data => {
      this.deskService.todoList = data;
    })
  }

  public addItem(todo: Todo)
  {
    this.deskService.addItem(todo).subscribe(data => {
      console.log(data);
      this.getAllItems();
      
    })
  }

  public addTodo()
  {
    if (this.title.split(' ').join('') == '') {
      alert('Fill in field');
      this.title = '';
      return;
    }

    const todo: Todo = {
      title: this.title,
    }

    this.addItem(todo);
    this.title = '';
  }
}
