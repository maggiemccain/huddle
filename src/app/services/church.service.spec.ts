import { TestBed, inject } from '@angular/core/testing';

import { ChurchService } from './church.service';

describe('ChurchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChurchService]
    });
  });

  it('should be created', inject([ChurchService], (service: ChurchService) => {
    expect(service).toBeTruthy();
  }));
});
