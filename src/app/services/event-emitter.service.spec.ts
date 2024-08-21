import { TestBed } from '@angular/core/testing';

import { EventEmitterService } from './event-emitter.service';

//is needed to get the Info in some components that the vieved file was changed

describe('EventEmitterService', () => {
  let service: EventEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
