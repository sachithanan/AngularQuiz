import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { QuestionServiceService } from '../question-service.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
export interface Option {
  id: number;
  option: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  questionText: string;
  options: Option[];
}
export interface UserAnswer {
  userId: number;
  questionId: number;
  AnswerId: number;
}

const routes: Routes = [
  { path: 'testpage/:topicId' },
];

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [FormsModule, CommonModule, NgClass, NgFor],
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit, OnDestroy {
  constructor(
    private questionService: QuestionServiceService,
    private http: HttpClient,
    private routers: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  topicId: number = 0;
  questions: Question[] = [];
  selectedOptions: Option[] = [];
  shuffledQuestions: Question[] = [];
  score: number = 0;
  quizCompleted: boolean = false;
  timer: any;
  minutes: number = 0;
  seconds: number = 0;
  currentQuestionIndex: number = 0;
  userId: number = 0;
  isQuizInProgress: boolean = false;
  async ngOnInit() {
    await this.questionService.setUserId();
    this.userId = this.questionService.getUserId();
    this.routers.paramMap.subscribe(params => {
      const id = params.get('topicId');
      if (id !== null) {
        this.topicId = +id; 
        this.fetchQuestions(this.topicId);
        this.startTimer();
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        this.isQuizInProgress = true;
      } else {
        console.error('Topic ID is null');
      }
    });
  }

  fetchQuestions(topicId: number): void {
    this.questionService.setTopicId(topicId);
    this.questionService.getQuestionsByTopic(topicId).subscribe(questions => {
      this.questions = questions;
      this.minutes = questions.length;
      this.shuffledQuestions = this.shuffleArray([...this.questions]);
      this.fetchOptionsForQuestions();
    });
  }

  fetchOptionsForQuestions(): void {
    this.shuffledQuestions.forEach((question, index) => {
      this.questionService.getOptionsByQuestionId(question.id).subscribe(options => {
        this.shuffledQuestions[index].options = options;
      });
    });
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  selectOption(questionIndex: number, option: Option): void {
    this.selectedOptions[questionIndex] = option;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    if (this.isQuizInProgress && !this.quizCompleted) {
      this.exitQuiz();
    }
  }

  handleVisibilityChange() {
    if (this.isQuizInProgress && document.hidden) {
      this.exitQuiz();
    }
  }

  Score = {
    topicId: 0,
    userId: 0,
    dateCompleted: new Date(),
    mark: 0,
    topic: null,
    user: null,
  }

  questioncount:any;
  async submitQuiz() {
    const topicName = sessionStorage.getItem('topicName');
    const username = sessionStorage.getItem('userName');
    const userAnswers = this.selectedOptions.map((option, index) => ({
      question: this.shuffledQuestions[index],
      selectedOption: option,
      isCorrect: option.isCorrect
    }));
  
    if (this.isQuizComplete()) {
      this.score = userAnswers.filter(answer => answer.isCorrect).length;
      this.Score.mark = this.score;
      await this.questionService.postScore(this.Score);
      await this.saveUserAnswers();
      this.quizCompleted = true;
      this.router.navigate(['/score'], { 
        queryParams: { topicName, username, score: this.score }, 
        state: { userAnswers }
      });
      clearInterval(this.timer);
      this.isQuizInProgress = false;
    } else {
      this.openSnackBar('Must Answer All Questions!!!', 'Close', 3000);
    }
  }
  
  
  saveUserAnswers(): Promise<void> {
    const userAnswerPromises = this.selectedOptions.map((option, index) => {
      this.questioncount=this.shuffledQuestions.length;
          sessionStorage.setItem('count', JSON.stringify(this.questioncount));
      const userAnswer: UserAnswer = {
        userId: this.userId,
        questionId: this.shuffledQuestions[index].id,
        AnswerId: option.id
      };
      return this.questionService.postUserAnswer(userAnswer).toPromise();
    });
  
    return Promise.all(userAnswerPromises).then(() => {}).catch(error => {
      console.error('Error saving user answers', error);
    });
  }

  isQuizComplete(): boolean {
    return (
      this.selectedOptions.length === this.shuffledQuestions.length &&
      this.selectedOptions.every(option => option !== undefined)
    );
  }

  exitQuiz(): void {
    this.score = 0;
    this.quizCompleted = true;
    clearInterval(this.timer);
    this.openSnackBar('Sorry, you are not fit for that Exam. Bye Bye!!!', 'Close', 5000);
    this.router.navigate(['/userdashboard']);
    this.isQuizInProgress = false;
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.submitQuiz();
          
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top'
    });
  }
  
}
