import { TestBed, inject } from '@angular/core/testing';

import { AgentManagerService } from './agent-manager.service';

describe('AgentManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentManagerService]
    });
  });

  it('should be created', inject([AgentManagerService], (service: AgentManagerService) => {
    expect(service).toBeTruthy();
  }));
});
