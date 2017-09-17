import { TestBed, inject } from '@angular/core/testing';

import { GatheringsService } from './gatherings.service';

describe('GatheringsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GatheringsService]
    });
  });

  it('should be created', inject([GatheringsService], (service: GatheringsService) => {
    expect(service).toBeTruthy();
  }));
});
