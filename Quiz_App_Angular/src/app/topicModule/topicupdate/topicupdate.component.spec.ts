import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicupdateComponent } from './topicupdate.component';

describe('TopicupdateComponent', () => {
  let component: TopicupdateComponent;
  let fixture: ComponentFixture<TopicupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
