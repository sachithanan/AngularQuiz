import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionServiceService } from '../../question-service.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TopicserviceService } from '../../topicservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-questionupdate',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatDialogModule],
  templateUrl: './questionupdate.component.html',
  styleUrls: ['./questionupdate.component.css'],
})
export class QuestionupdateComponent implements OnInit {
  topics: any[] = [];
  questions: any[] = [];
  selectedTopicId: number = 0;
  selectedQuestion: any;
  selectedQuestionId: number = 0;
  options: { id: number, option: string, isCorrect: boolean }[] = [];
  editedQuestion: any = {
    TopicId: 0,
    QuestionText: '',
    CreatedBy: 0,
    CreatedOn: new Date(),
    ModifiedBy: 0,
    ModifiedOn: new Date(),
    Topic: null,
    Id: 0,
  };

  constructor(
    private questionService: QuestionServiceService,
    private dialog: MatDialog,
    private topicService: TopicserviceService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<QuestionupdateComponent>
  ) {}

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
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  onSelectQuestion() {
    if (this.selectedQuestion) {
      this.editedQuestion.QuestionText = this.selectedQuestion.questionText;
      this.questionService.getOptionsByQuestionId(this.selectedQuestion.id).subscribe(
        (options: any[]) => {
          this.options = options.map(option => ({
            id: option.id,
            option: option.option,
            isCorrect: option.isCorrect,
          }));
        },
        error => {
          console.error('Error fetching options:', error);
        }
      );
    }
  }

  addOption(): void {
    this.options.push({ id: 0, option: '', isCorrect: false });
  }

  removeOption(index: number,id:number): void {
    this.options.splice(index, 1);
    this.questionService.deleteOption(id);
  }

  async saveQuestion() {
    if (this.selectedQuestion) {
      try {
        const currentUser = sessionStorage.getItem('user');
        if (currentUser) {
          const userDetails = JSON.parse(currentUser);
          this.selectedQuestion.modifiedBy = userDetails;
        }
        console.log('Edited Question:', this.selectedQuestion);

        await this.questionService.updateQuestion(this.selectedQuestion);

        for (const option of this.options) {
          const optionData = {
            id: option.id,
            questionId: this.selectedQuestion.id,
            option: option.option,
            isCorrect: option.isCorrect,
            modifiedBy: this.selectedQuestion.modifiedBy,
            modifiedOn: new Date(),
            createdBy:0,
            createdOn:new Date(),
            question:null
          };

          if (option.id === 0) {
            // New option
            await this.questionService.addOption(optionData).toPromise();
          } else {
            // Existing option
            await this.questionService.updateOption(optionData);
          }
        }

        this.openSnackBar('Question and options updated successfully', 'Close', 3000);
        this.dialogRef.close();
      } catch (error) {
        console.error('Error updating question:', error);
        this.openSnackBar('Error occurred while saving the question', 'Close', 5000);
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
    });
  }
}
