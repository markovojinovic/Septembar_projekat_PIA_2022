import { TestBed } from '@angular/core/testing';

import { UnregisterService } from './unregister.service';

describe('UnregisterService', () => {
  let service: UnregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
