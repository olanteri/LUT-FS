import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { filter, Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Todo } from 'src/app/Todo';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todos!: any[];
  
  title!: String;
  description!: String;
  name!: String;
  isDone!: boolean;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.todos = [];
    this.authService.getTodos().subscribe((todos: any) => {
      this.todos = todos;
      console.log(this.todos);
    },
    (err) => {
      console.log(err);
      return false;
    })
  }

  onAddTodo() {
    var todo = {
      title: this.title,
      description: this.description,
      name: this.authService.getUser(),
      isDone: false
    }
    // check fields
    if (!this.validateService.validateTodo(todo)) {
      this.flashMessage.show("Please fill in all fields", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    };
    // add todo
    this.authService.saveTodo(todo).subscribe((data: any) => {
      if (data.success) {
        this.flashMessage.show("New todo created!", {cssClass: 'alert-success', timeout: 3000});
        this.todos.push(todo);
        this.title = '';
        this.description = '';
        this.ngOnInit();
      } else {
        this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    return true;
  }
  
  deleteTodo(todo: any) {
    this.authService.deleteTodo(todo._id).subscribe(todo => this.ngOnInit());
    // console.log(todo._id);
    // this.todos.forEach((obj, index) => {
    //   if (obj._id == todo._id) {
    //     this.todos.splice(index,1);
    //   }
    // })
  }

  // updateStatus() {
  //   let todo = {
  //     _id: todo._id,
  //     title: todo.title,

  //   }
  // }

}
