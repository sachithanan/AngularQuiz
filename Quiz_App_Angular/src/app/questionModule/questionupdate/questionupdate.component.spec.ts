import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionupdateComponent } from './questionupdate.component';

describe('QuestionupdateComponent', () => {
  let component: QuestionupdateComponent;
  let fixture: ComponentFixture<QuestionupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
