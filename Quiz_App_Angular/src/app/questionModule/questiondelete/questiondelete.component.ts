import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../user-service.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { QuestionServiceService } from '../../question-service.service';
import { TopicserviceService } from '../../topicservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-questiondelete',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,NgClass,MatDialogModule],
  templateUrl: './questiondelete.component.html',
  styleUrl: './questiondelete.component.css'
})
export class QuestiondeleteComponent {
  constructor(private userService: UserServiceService,private dialog: MatDialog ,
    public dialogRef: MatDialogRef<QuestiondeleteComponent>,
    private questionService:QuestionServiceService,
    private topicService:TopicserviceService,private snackBar: MatSnackBar,){}
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  onDeleteClick(): void {
    this.userService.deleteUser()
    window.location.reload();
    this.dialogRef.close(true);
  }
  
    topics: any[] = [];
    questions: any[] = [];
    selectedTopicId: number = 0;
    selectedQuestion: any;
    selectedQuestionId: number = 0;
      editedQuestion: any = {
        TopicId: 0,
        Id: 0
      };
    
      async ngOnInit() {
        try {
          this.topics = await this.topicService.GetTopicList();
        } catch (error) {
          console.error('Error fetching topics:', error);
        }
      }
    
      onSelectTopic() {
        this.questionService.getQuestionsByTopic(this.selectedTopicId).subscribe(
          (questions: any[]) => {
            this.questions = questions;
            this.selectedQuestion = ''; 
            if (this.selectedQuestion) {
              console.log(this.selectedQuestion)
              this.selectedQuestionId = this.selectedQuestion.id;
            }
          },
          error => {
            console.error('Error fetching questions:', error);
          }
        );
      }
      onSelectQuestion() {
        if (this.selectedQuestion) {
          this.editedQuestion.QuestionText = this.selectedQuestion.questionText;
        }
      }
      cancel(){
        this.dialogRef.close();
      }
     deleteQuestion(selectedQuestion:any) {
      if (selectedQuestion) {
        try{
          const currentUser= sessionStorage.getItem('user');
          if(currentUser)
          {
            const userDetails=JSON.parse(currentUser);
            selectedQuestion.modifiedBy=userDetails;
          }
          this.questionService.deleteQuestion(selectedQuestion.id)
          this.openSnackBar('Question Deleted successfully', 'Close', 3000);
          this.dialogRef.close();
      }
      catch{
        this.openSnackBar('Error occured when delete the question', 'Close', 5000);
      }
    }
    }
    openSnackBar(message: string, action: string, duration: number) {
      this.snackBar.open(message, action, {
        duration: duration,
        verticalPosition: 'top'
      });
    }
  }

