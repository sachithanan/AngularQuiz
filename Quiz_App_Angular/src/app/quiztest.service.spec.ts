import { TestBed } from '@angular/core/testing';

import { QuiztestService } from './quiztest.service';

describe('QuiztestService', () => {
  let service: QuiztestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuiztestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
