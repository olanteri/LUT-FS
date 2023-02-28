import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todos!: any[];

  constructor(private authService: AuthService, private router: Router) { }

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

}
