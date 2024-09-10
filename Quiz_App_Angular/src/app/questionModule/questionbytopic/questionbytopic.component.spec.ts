import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionbytopicComponent } from './questionbytopic.component';

describe('QuestionbytopicComponent', () => {
  let component: QuestionbytopicComponent;
  let fixture: ComponentFixture<QuestionbytopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionbytopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionbytopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
