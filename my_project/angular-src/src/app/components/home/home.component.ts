import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  done!: number;
  notDone!: number;
  todos!: any[];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.todos = [];
    this.done = 0;
    this.notDone = 0;
    this.authService.getTodos().subscribe((todos: any) => {
      this.todos = todos;
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].isDone == false) {
          this.notDone++;
        } else {
          this.done++;
        }
      }
    },
    (err) => {
      console.log(err);
      return false;
    });
  }
}
