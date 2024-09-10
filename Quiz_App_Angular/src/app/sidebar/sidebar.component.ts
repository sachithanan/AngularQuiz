import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserComponent } from '../userModule/user/user.component';
import { QuestionComponent } from '../questionModule/questioncreate/question.component';
import { TopicComponent } from '../topicModule/topic/topic.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { QuestionbytopicComponent } from '../questionModule/questionbytopic/questionbytopic.component';
import { QuestionupdateComponent } from '../questionModule/questionupdate/questionupdate.component';
import { QuestiondeleteComponent } from '../questionModule/questiondelete/questiondelete.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private dialog: MatDialog,private http:HttpClient,private router:Router){}
  @Input() isAdmin: boolean = false;
  user(){
    console.log("clicked");
    this.router.navigate(['admindashboard/user']);

    //  this.dialog.open(UserComponent,{width:'850px',height:'550px'});
   
  }
  question(){
    this.router.navigate(['admindashboard/questiondashboard']); 

    // this.dialog.open(QuestionComponent,{width:'250px',height:'100px'})
  }
  topic(){
    this.router.navigate(['admindashboard/topic']);

    //.dialog.open(TopicComponent,{width:'750px',height:'500px'})
  }
  async score(){ 
    this.router.navigate(['/userscore'])
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
    Test(){
      this.router.navigate(['admindashboard/quiztest']);
        
    }
}
