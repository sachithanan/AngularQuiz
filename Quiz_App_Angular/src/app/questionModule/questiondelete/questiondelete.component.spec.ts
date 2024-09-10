import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestiondeleteComponent } from './questiondelete.component';

describe('QuestiondeleteComponent', () => {
  let component: QuestiondeleteComponent;
  let fixture: ComponentFixture<QuestiondeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestiondeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestiondeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
