import { Component, ViewEncapsulation } from '@angular/core';
import { TodoFileModuleService } from './todoFileModule.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todoFileModule.component.html',
  styleUrls: ['./todoFileModule.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ TodoFileModuleService ]
})
export class TodoFileModuleComponent {
  public todoList:Array<any>;
  public newTodoText:string = '';

  constructor( private _todoService:TodoFileModuleService) {
    this.todoList = this._todoService.getTodoList();
  }

  public  getNotDeleted() {
    return this.todoList.filter((item:any) => {
      return !item.deleted
    })
  }


  public addToDoItem($event) {
    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
      this.todoList.unshift({
          text: this.newTodoText
      });
      this.newTodoText = '';
    }
  }

}
