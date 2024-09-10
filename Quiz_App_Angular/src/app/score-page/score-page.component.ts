import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from '../test-page/test-page.component';
@Component({
  selector: 'app-score-page',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgClass],
  templateUrl: './score-page.component.html',
  styleUrl: './score-page.component.css'
})

export class ScorePageComponent implements OnInit {
  userAnswers: any[] = [];
  topicName: string='';
  username: string='';
  score: number=0;
  
  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.userAnswers = navigation.extras.state['userAnswers'];
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.topicName = params['topicName'];
      this.username = params['username'];
      this.score = params['score'];
    });
    if (this.isBrowser()) {
      const storedData = sessionStorage.getItem('count');
      if (storedData) {
        this.length = JSON.parse(storedData);
      }
    }
  }
length:number=1;
isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
}
prepare(){
    const currentUser = sessionStorage.getItem('count');
    if (currentUser) {
      const userDetails = JSON.parse(currentUser);
      this.length = userDetails;
    }
  }

  // getCorrectAnswer(options: Option[]): Option {
  //   return options.find(option => option.isCorrect);
  // }
  getCorrectAnswer(options: Option[]): Option {
    const correctOption = options.find(option => option.isCorrect);
    return correctOption || { id: 0, option: '', isCorrect: false }; 
  }
  getScoreImage(): string {
    const percentage = ((this.score)/this.length) * 100;
    if (percentage <50) {
      return 'assets/sorry.jpg ';
    } else if (percentage <=70) {
      return 'assets/man.jpg';
    } else if (percentage <=90) {
      return 'assets/2p.png';
    } else {
      return 'assets/gold.png';
    }
  }
  BackToHome(){
    this.router.navigate(['/userdashboard'])
  }
}