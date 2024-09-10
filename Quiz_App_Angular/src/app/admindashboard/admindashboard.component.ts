import { Component } from '@angular/core';
import { UserComponent } from '../userModule/user/user.component';
import { TopicComponent } from '../topicModule/topic/topic.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { EditComponent } from '../userModule/edit/edit.component';
import { QuiztestComponent } from '../quiztest/quiztest.component';
import { MatDialog } from '@angular/material/dialog'; 
import { CreateComponent } from '../userModule/create/create.component';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';
import { LoginComponent } from '../login/login.component';
import { QuestionComponent } from '../questionModule/questioncreate/question.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { QuestionbytopicComponent } from '../questionModule/questionbytopic/questionbytopic.component';
import { QuestiondeleteComponent } from '../questionModule/questiondelete/questiondelete.component';
import { QuestionupdateComponent } from '../questionModule/questionupdate/questionupdate.component';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [UserComponent,TopicComponent,RouterModule,RouterLink,EditComponent,
    QuiztestComponent,CreateComponent,LoginComponent,NavbarComponent,SidebarComponent],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})

export class AdmindashboardComponent {
  constructor(private http: HttpClient, private router: Router, 
    private userService: UserServiceService,private dialog: MatDialog) {}
    sideBarButtons:any = [
      {name:'User', component:'user'},
      {name:'Question', component:'question'},
      {name:'Topic', component:'topic'},
      {name:'Test', component:'test'},
    
    ]
    
  response(){
    console.log("clicked");  
  }
  user(){
    this.router.navigate(['admindashboard/user']);
    console.log("clicked");
    //  this.dialog.open(UserComponent,{width:'850px',height:'550px'});
   
  }
  question(){
    this.dialog.open(QuestionComponent,{width:'250px',height:'100px'})
  }
  topic(){
    this.router.navigate(['admindashboard/topic']);

    // this.dialog.open(TopicComponent,{width:'750px',height:'500px'})
  }
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
  Logout(){
    
  }
}
