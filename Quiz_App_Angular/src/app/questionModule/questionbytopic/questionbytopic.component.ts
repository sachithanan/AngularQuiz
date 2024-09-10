import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { TopicserviceService } from '../../topicservice.service';
import { QuestionServiceService } from '../../question-service.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-questionbytopic',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NavbarComponent,MatDialogModule],
  templateUrl: './questionbytopic.component.html',
  styleUrl: './questionbytopic.component.css'
})
export class QuestionbytopicComponent implements OnInit{
 constructor(private http:HttpClient,private topicService:TopicserviceService,private questionService:QuestionServiceService,private mat:MatDialog){}
 async ngOnInit(){
    try {
      this.topics = await this.topicService.GetTopicList();
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  }
  topics: any[] = [];
  questions: any[] = [];
  selectedTopicId: number = 0;
  selectedQuestion: any;
  onSelectTopic() {
    this.questionService.getQuestionsByTopic(this.selectedTopicId).subscribe(
      (questions: any[]) => {
        this.questions = questions;
        this.selectedQuestion = ''; 
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }
}
