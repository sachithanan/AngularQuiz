// view-score.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuiztestService } from '../quiztest.service';
import { TopicserviceService } from '../topicservice.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-score',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxChartsModule],
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.css']
})
export class ViewScoreComponent implements OnInit {
  
  scoreForm: FormGroup | any;
  scores: any[] = [];
  topics: { [key: number]: string } = {};
  barChartData: any[] = []; 
  topicOptions: any[] = [];
  selectedTopicId: number = 0;
  attemptMarks: any[] = [];

  colorScheme = {
    domain: ['#f2a900', '#f9c74f', '#90be6d', '#43aa8b', '#577590']
  };

  constructor(
    private fb: FormBuilder,
    private testService: QuiztestService,
    private topicService: TopicserviceService
  ) {}

  ngOnInit() {
    this.scoreForm = this.fb.group({
      date: [''],
      topic: ['']
    });
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      const storedData = sessionStorage.getItem('userId');
      if (storedData) {
        this.userId = JSON.parse(storedData);
      }
    }
  }
  yAxisTickFormatting(value: number): string {
    return value % 1 === 0 ? value.toString() : '';
  }
  userId: number = 0;

  onSubmit() {
    const userId = this.userId;
    const date = this.scoreForm.value.date;
    this.testService.getScores(userId, date).subscribe(data => {
      this.scores = data;
      this.fetchTopicOptions();
    });
  }

  fetchTopicOptions() {
    const topicIds = Array.from(new Set(this.scores.map(score => score.topicId)));
    this.topicOptions = [];
    this.topics = {};
    topicIds.forEach(topicId => {
      this.topicService.GetTopicDetail(topicId).then(topic => {
        if (topic) {
          this.topics[topicId] = topic.topicName;
          this.topicOptions.push({ id: topicId, name: topic.topicName });
        }
      });
    });
  }

  onTopicChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTopicId = Number(selectElement.value);
    this.prepareAttemptMarks();
    this.prepareChartData();
  }

  prepareAttemptMarks() {
    this.attemptMarks = this.scores
      .filter(score => score.topicId === this.selectedTopicId)
      .map(score => ({
        mark: score.mark
      }));
  }

  prepareChartData() {
    this.barChartData = this.attemptMarks.map((mark, index) => ({
      name: `Attempt ${index + 1}`,
      value: mark.mark
    }));
  
    console.log('Bar Chart Data:', this.barChartData);
  }
}
