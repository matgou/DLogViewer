import { TestBed, inject } from '@angular/core/testing';

import { LogFileBagService } from './log-file-bag.service';

describe('LogFileBagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogFileBagService]
    });
  });

  it('should be created', inject([LogFileBagService], (service: LogFileBagService) => {
    expect(service).toBeTruthy();
  }));
});
