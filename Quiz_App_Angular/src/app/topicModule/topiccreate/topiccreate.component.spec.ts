import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopiccreateComponent } from './topiccreate.component';

describe('TopiccreateComponent', () => {
  let component: TopiccreateComponent;
  let fixture: ComponentFixture<TopiccreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopiccreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopiccreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
