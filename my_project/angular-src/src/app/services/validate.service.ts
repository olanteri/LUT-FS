import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: { name: any; email: any; username: any; password: any; }) {
    if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  };
  validateEmail = (email: String) => {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  validateTodo(todo: { title: any; description: any; }) {
    if (todo.title == undefined || todo.title.length < 2 || todo.description == undefined || todo.description.length < 2) {
      return false;
    } else {
      return true;
    }
  };
}
