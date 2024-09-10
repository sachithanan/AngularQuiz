import { Component } from '@angular/core';
import { QuestionServiceService } from '../../question-service.service';
import { HttpClient } from '@angular/common/http';
import { Dialog } from '@angular/cdk/dialog';
import { QuestionComponent } from '../questioncreate/question.component';
import { MatDialog } from '@angular/material/dialog';
import { QuestionupdateComponent } from '../questionupdate/questionupdate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { QuestiondeleteComponent } from '../questiondelete/questiondelete.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { QuestionbytopicComponent } from '../questionbytopic/questionbytopic.component';

@Component({
  selector: 'app-questiondashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,QuestionComponent,RouterLink,NavbarComponent],
  templateUrl: './questiondashboard.component.html',
  styleUrl: './questiondashboard.component.css'
})
export class QuestiondashboardComponent {
constructor(private questionservice:QuestionServiceService,private http:HttpClient,private dialog:MatDialog,private route:Router){}

postquestion(){
  this.dialog.open(QuestionComponent);
}
updatequestion(){
  const dialogRef = this.dialog.open(QuestionupdateComponent,{width:'450'})
}
deletequestion(){
  const dialogRef = this.dialog.open(QuestiondeleteComponent,{width:'450'})
}
showall(){
  this.dialog
}
showQuestions: boolean = false;
showOptions: boolean = false;

toggleQuestions() {
  this.showQuestions = !this.showQuestions;
  this.showOptions = false; 
}

toggleOptions() {
  this.showOptions = !this.showOptions;
  this.showQuestions = false; 
}
questionbyTopic(){
  this.dialog.open(QuestionbytopicComponent)
 
}
}

