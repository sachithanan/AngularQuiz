import { Component, OnInit } from '@angular/core';
import { TopicserviceService } from '../../topicservice.service';
import { QuestionServiceService } from '../../question-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  topics: any[] = [];
  selectedTopicId: number = 0;
  questionText: string = '';
  options: { text: string, isCorrect: boolean }[] = [{ text: '', isCorrect: false }];
  UserId: number = 0;

  constructor(
    private topicService: TopicserviceService,
    private questionService: QuestionServiceService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    try {
      this.topics = await this.topicService.GetTopicList();
    } catch {
      console.log("Error fetching topics:");
    }
  }

  addOption(): void {
    this.options.push({ text: '', isCorrect: false });
  }

  removeOption(index: number): void {
    this.options.splice(index, 1);
  }

  async submitQuestion() {
    const currentUser = sessionStorage.getItem('user');
    if (currentUser) {
      const userDetails = JSON.parse(currentUser);
      this.UserId = userDetails;
    }

    const question = {
      TopicId: +this.selectedTopicId,
      QuestionText: this.questionText,
      CreatedBy: this.UserId,
      CreatedOn: new Date(),
      ModifiedBy: 0,
      ModifiedOn: new Date(),
      Topic: null,
      Id: 0
    };

    this.questionService.addQuestion(question).subscribe({
      next: async (response: any) => {
        console.log("Response ->", response);
        const questionId = response.id;

        for (const option of this.options) {
          const optionData = {
            QuestionId: questionId,
            Option: option.text,
            IsCorrect: option.isCorrect,
            Question: null,
            CreatedBy: this.UserId,
            CreatedOn: new Date(),
            ModifiedBy: 0,
            ModifiedOn: new Date(),
            Id: 0
          };

          await this.questionService.addOption(optionData).toPromise().then(
            (optionResponse: any) => {
              console.log("Option added successfully ->", optionResponse);
              this.dialog.closeAll();
            }
          ).catch((err: any) => {
            console.log("Error adding option ->", err);
          });
        }
      },
      error: (err: any) => {
        console.log("Error adding question ->", err);
      }
    });
  }
}
