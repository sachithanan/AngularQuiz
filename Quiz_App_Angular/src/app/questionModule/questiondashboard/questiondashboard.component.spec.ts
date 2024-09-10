import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestiondashboardComponent } from './questiondashboard.component';

describe('QuestiondashboardComponent', () => {
  let component: QuestiondashboardComponent;
  let fixture: ComponentFixture<QuestiondashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestiondashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestiondashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
