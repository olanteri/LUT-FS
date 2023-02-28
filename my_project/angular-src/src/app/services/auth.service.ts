import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' 
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  todo: any;
  name: any;

  constructor(private http: HttpClient) { }

  registerUser(user: { name: String; email: String; username: String; password: String; }) {
    const headers = {
      'content-type': 'application/json'
    }
    return this.http.post('http://localhost:3000/users/register', user, {'headers': headers});
  }

  authenticateUser(user: { username: String; password: String; }) {
    const headers = {
      'content-type': 'application/json'
    }
    return this.http.post('http://localhost:3000/users/authenticate', user, {'headers': headers});
  }

  getUser() {
    var user = JSON.parse(localStorage.getItem('user') || "");
    return user.name;
  }

  getTodos() {
    this.loadToken();
    const headers = {
      'content-type': 'application/json',
      'Authorization': this.authToken
    }

  return this.http.get('http://localhost:3000/users/todo', {'headers': headers});
  }

  deleteTodo(id: String) {
    console.log(id);
    this.loadToken();
    const headers = {
      'content-type': 'application/json',
      'Authorization': this.authToken
    }

  return this.http.delete<String>('http://localhost:3000/users/todo/'+id, {'headers': headers});
  }

  updateTodos(todo: {title: String, description: String, name: String, isDone: boolean}) {
    this.loadToken();
    const headers = {
      'content-type': 'application/json',
      'Authorization': this.authToken
    }

  return this.http.put('http://localhost:3000/users/todo/:id', todo, {'headers': headers});
  }

  saveTodo(todo: {title: String, description: String, name: String, isDone: boolean}) {
    this.loadToken();
    const headers = {
      'content-type': 'application/json',
      'Authorization': this.authToken
    }

  return this.http.post('http://localhost:3000/users/todo/', todo, {'headers': headers});
  }

  storeUserData(token: string, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  tokenExpired() {
    this.loadToken();
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
