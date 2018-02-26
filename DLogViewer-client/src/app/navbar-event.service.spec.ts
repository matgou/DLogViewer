import { TestBed, inject } from '@angular/core/testing';

import { SearchEventService } from './navbar-event.service';

describe('NavbarEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarEventService]
    });
  });

  it('should be created', inject([NavbarEventService], (service: NavbarEventService) => {
    expect(service).toBeTruthy();
  }));
});
