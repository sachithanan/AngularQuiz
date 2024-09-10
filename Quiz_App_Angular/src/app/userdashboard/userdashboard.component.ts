import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { QuiztestComponent } from '../quiztest/quiztest.component';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,QuiztestComponent,LoginComponent,NavbarComponent],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent{
  constructor(private router:Router) { }
  async test(){
    this.router.navigate(['/quiztest']);
  }
  async score(){ 
  this.router.navigate(['/userscore'])
  }
  }
