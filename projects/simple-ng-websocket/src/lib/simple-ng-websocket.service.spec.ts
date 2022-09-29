import { TestBed } from '@angular/core/testing';

import { SimpleNgWebsocketService } from './simple-ng-websocket.service';

describe('SimpleNgWebsocketService', () => {
  let service: SimpleNgWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleNgWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
