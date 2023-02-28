import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'flash-messages-angular';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { UpdatetodoComponent } from './updatetodo/updatetodo.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'todo', component: TodolistComponent, canActivate:[AuthGuard]},
  {path:'todo/:id', component: UpdatetodoComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    TodolistComponent,
    UpdatetodoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule,
    HttpClientModule
  ],
  providers: [ValidateService, FlashMessagesService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
