import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username!: String;
  password!: String;

  constructor(
    private authService: AuthService, 
    private flashMessage: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() { }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe((data: any) => {
      if(data.success) {
        console.log(data);
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show(
          'You are now logged in', 
          {cssClass: 'alert-success', 
          timeout: 5000});
        this.router.navigate(['dashboard'])
      } else {
        this.flashMessage.show(
          data.msg, 
          {cssClass: 'alert-danger', 
          timeout: 5000});
        this.router.navigate(['login'])
      }
    });
  }

}
